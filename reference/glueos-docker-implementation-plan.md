# Docker Implementation Plan for GlueOS

## Overview

**Objectives:**
1. Dockerize the current GlueOS UI Toolkit project (generator development environment)
2. Create Docker templates that the generator includes in all generated projects
3. Ensure consistent development experience across all client projects

**Prerequisites:**
- ✅ Generator V1.0 is complete and working
- ✅ Deployed to Vercel and tested
- ✅ First test project generated successfully

**Timeline:** 1 week
- Phase 1: Dockerize current project (2 days)
- Phase 2: Create generator templates (2 days)
- Phase 3: Integration and testing (1 day)

---

## Part 1: Dockerize Current GlueOS Project

### Goal
Make the GlueOS UI Toolkit development environment fully containerized so developers can run:
```bash
git clone glueos-ui
docker compose up
# Generator app, Storybook, and example app all running
```

### What This Achieves
- Consistent development environment for generator development
- Easy onboarding for new contributors
- Testing ground for Docker configs before using in generated projects

---

### 1.1: Docker Configuration Files

#### File: `Dockerfile.dev` (Root of monorepo)

```dockerfile
# Base stage - shared by all services
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build shared packages
RUN pnpm run build --filter=@glueos/ui

# Development stage
FROM base AS development
ENV NODE_ENV=development
EXPOSE 3000 6006

# Production build stage (for future use)
FROM base AS build
RUN pnpm run build

# Production stage (for future use)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]
```

---

#### File: `docker-compose.yml` (Root of monorepo)

```yaml
version: '3.8'

services:
  # Generator web app
  generator:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    container_name: glueos-generator
    volumes:
      - .:/app
      - /app/node_modules
      - /app/apps/*/node_modules
      - /app/packages/*/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_TELEMETRY_DISABLED=1
    command: pnpm run dev --filter=generator
    networks:
      - glueos-network

  # Storybook
  storybook:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    container_name: glueos-storybook
    volumes:
      - .:/app
      - /app/node_modules
      - /app/apps/*/node_modules
      - /app/packages/*/node_modules
    ports:
      - "6006:6006"
    environment:
      - NODE_ENV=development
    command: pnpm run dev --filter=storybook
    networks:
      - glueos-network

  # Example app (for testing)
  example:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    container_name: glueos-example
    volumes:
      - .:/app
      - /app/node_modules
      - /app/apps/*/node_modules
      - /app/packages/*/node_modules
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3001
    command: pnpm run dev --filter=example
    networks:
      - glueos-network

networks:
  glueos-network:
    driver: bridge

volumes:
  node_modules:
```

---

#### File: `.dockerignore` (Root of monorepo)

```
# Dependencies
node_modules
**/node_modules

# Build outputs
.next
dist
build
out
storybook-static

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment variables
.env
.env*.local

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode
.idea
*.swp
*.swo

# Git
.git
.gitignore

# CI/CD
.github

# Docker
Dockerfile*
docker-compose*.yml
.dockerignore
```

---

#### File: `Makefile` (Root of monorepo - convenient commands)

```makefile
.PHONY: help up down build rebuild logs shell clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services
	docker compose up -d

down: ## Stop all services
	docker compose down

build: ## Build all containers
	docker compose build

rebuild: ## Rebuild containers without cache
	docker compose build --no-cache

logs: ## Show logs from all services
	docker compose logs -f

generator-logs: ## Show logs from generator only
	docker compose logs -f generator

storybook-logs: ## Show logs from storybook only
	docker compose logs -f storybook

shell: ## Open shell in generator container
	docker compose exec generator sh

clean: ## Remove all containers, volumes, and images
	docker compose down -v --rmi all

install: ## Install dependencies in container
	docker compose exec generator pnpm install

build-ui: ## Build UI package
	docker compose exec generator pnpm run build --filter=@glueos/ui

test: ## Run tests
	docker compose exec generator pnpm run test

lint: ## Run linter
	docker compose exec generator pnpm run lint
```

---

#### File: `.devcontainer/devcontainer.json` (VS Code Remote Containers)

```json
{
  "name": "GlueOS Development",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "generator",
  "workspaceFolder": "/app",
  
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "ms-azuretools.vscode-docker",
        "styled-components.vscode-styled-components"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        "tailwindCSS.experimental.classRegex": [
          ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"]
        ]
      }
    }
  },
  
  "forwardPorts": [3000, 6006, 3001],
  "portsAttributes": {
    "3000": {
      "label": "Generator",
      "onAutoForward": "notify"
    },
    "6006": {
      "label": "Storybook",
      "onAutoForward": "notify"
    },
    "3001": {
      "label": "Example App",
      "onAutoForward": "notify"
    }
  },
  
  "postCreateCommand": "pnpm install",
  "remoteUser": "node"
}
```

---

### 1.2: Documentation

#### File: `DOCKER.md` (Root of monorepo)

```markdown
# Docker Development Guide

## Prerequisites

- Docker Desktop installed
- Git

## Quick Start

### Start all services
```bash
make up
# OR
docker compose up
```

This starts:
- **Generator App**: http://localhost:3000
- **Storybook**: http://localhost:6006
- **Example App**: http://localhost:3001

### View logs
```bash
make logs
# OR
docker compose logs -f
```

### Stop all services
```bash
make down
# OR
docker compose down
```

## Common Commands

```bash
make help              # Show all available commands
make up                # Start all services
make down              # Stop all services
make rebuild           # Rebuild containers from scratch
make logs              # View all logs
make shell             # Open shell in generator container
make clean             # Remove everything (fresh start)
```

## Development Workflow

### Making Changes
All code changes are hot-reloaded automatically via volume mounts.

### Installing Dependencies
```bash
make install
# OR
docker compose exec generator pnpm install
```

### Building UI Package
```bash
make build-ui
# OR
docker compose exec generator pnpm run build --filter=@glueos/ui
```

### Running Commands in Container
```bash
docker compose exec generator pnpm run [command]
```

## Using VS Code Remote Containers

1. Install "Remote - Containers" extension
2. Open project in VS Code
3. Click "Reopen in Container" when prompted
4. VS Code now runs inside the Docker container

## Troubleshooting

### Containers won't start
```bash
make clean   # Remove everything
make build   # Rebuild
make up      # Start fresh
```

### Hot reload not working
Check that volumes are mounted correctly in `docker-compose.yml`

### Port conflicts
Stop other services using ports 3000, 6006, or 3001

### Performance issues on macOS
Docker on macOS can be slow. Consider:
- Increase Docker Desktop resources (CPU/Memory)
- Use Docker Desktop with VirtioFS (faster file sharing)
```

---

#### Update: `README.md` (Add Docker section)

```markdown
## Development Setup

### Option 1: Docker (Recommended)

**Prerequisites:**
- Docker Desktop

**Quick Start:**
```bash
git clone [repo]
cd glueos-ui
docker compose up
```

**Services:**
- Generator: http://localhost:3000
- Storybook: http://localhost:6006
- Example App: http://localhost:3001

See [DOCKER.md](./DOCKER.md) for detailed Docker documentation.

### Option 2: Local Development

**Prerequisites:**
- Node.js 20+
- pnpm 8+

**Setup:**
```bash
pnpm install
pnpm run build --filter=@glueos/ui
pnpm run dev
```
```

---

## Part 2: Create Docker Templates for Generated Projects

### Goal
Create Docker configuration templates that the generator includes in every new project.

These templates will support:
- Simple projects (just Next.js apps)
- Complex projects (Next.js + API + Database + Redis + etc.)

---

### 2.1: Generator Template Files

#### File: `templates/docker/Dockerfile.dev`

```dockerfile
# Base stage - shared by all services
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Install dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY . .

# Build UI package
RUN pnpm run build --filter=@{{CLIENT_SLUG}}/ui

ENV NODE_ENV=development

# Build stage (for production)
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

---

#### File: `templates/docker/docker-compose.yml`

```yaml
version: '3.8'

services:
  # PostgreSQL Database (optional - uncomment if needed)
  # postgres:
  #   image: postgres:15-alpine
  #   container_name: {{CLIENT_SLUG}}-postgres
  #   environment:
  #     POSTGRES_DB: {{CLIENT_SLUG}}_db
  #     POSTGRES_USER: postgres
  #     POSTGRES_PASSWORD: dev_password_change_in_production
  #   ports:
  #     - "5432:5432"
  #   volumes:
  #     - postgres_data:/var/lib/postgresql/data
  #   networks:
  #     - {{CLIENT_SLUG}}-network
  #   healthcheck:
  #     test: ["CMD-SHELL", "pg_isready -U postgres"]
  #     interval: 10s
  #     timeout: 5s
  #     retries: 5

  # Redis Cache (optional - uncomment if needed)
  # redis:
  #   image: redis:7-alpine
  #   container_name: {{CLIENT_SLUG}}-redis
  #   ports:
  #     - "6379:6379"
  #   volumes:
  #     - redis_data:/data
  #   networks:
  #     - {{CLIENT_SLUG}}-network
  #   healthcheck:
  #     test: ["CMD", "redis-cli", "ping"]
  #     interval: 10s
  #     timeout: 5s
  #     retries: 5

  # Storybook
  storybook:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    container_name: {{CLIENT_SLUG}}-storybook
    volumes:
      - .:/app
      - /app/node_modules
      - /app/apps/*/node_modules
      - /app/packages/*/node_modules
    ports:
      - "6006:6006"
    environment:
      - NODE_ENV=development
    command: pnpm run dev --filter=storybook
    networks:
      - {{CLIENT_SLUG}}-network

networks:
  {{CLIENT_SLUG}}-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

---

#### File: `templates/docker/docker-compose.dev.yml`

```yaml
version: '3.8'

# This file defines development services for your apps
# Extend the base docker-compose.yml

services:
  # Example web app
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    container_name: {{CLIENT_SLUG}}-web
    volumes:
      - .:/app
      - /app/node_modules
      - /app/apps/*/node_modules
      - /app/packages/*/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_TELEMETRY_DISABLED=1
      # Uncomment and configure if using database
      # - DATABASE_URL=postgresql://postgres:dev_password_change_in_production@postgres:5432/{{CLIENT_SLUG}}_db
      # Uncomment if using Redis
      # - REDIS_URL=redis://redis:6379
    # depends_on:
    #   - postgres
    #   - redis
    command: pnpm run dev --filter=web
    networks:
      - {{CLIENT_SLUG}}-network

  # Add more apps as needed:
  # api:
  #   build:
  #     context: .
  #     dockerfile: Dockerfile.dev
  #     target: development
  #   container_name: {{CLIENT_SLUG}}-api
  #   volumes:
  #     - .:/app
  #     - /app/node_modules
  #   ports:
  #     - "3001:3001"
  #   environment:
  #     - NODE_ENV=development
  #     - DATABASE_URL=postgresql://postgres:dev_password_change_in_production@postgres:5432/{{CLIENT_SLUG}}_db
  #   depends_on:
  #     - postgres
  #   command: pnpm run dev --filter=api
  #   networks:
  #     - {{CLIENT_SLUG}}-network
```

---

#### File: `templates/docker/.dockerignore`

```
# Dependencies
node_modules
**/node_modules

# Build outputs
.next
dist
build
out
storybook-static

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Environment variables
.env
.env*.local

# Testing
coverage
.nyc_output

# OS files
.DS_Store
Thumbs.db
*.swp
*.swo
*~

# IDE
.vscode
.idea
*.sublime-project
*.sublime-workspace

# Git
.git
.gitignore
.gitattributes

# CI/CD
.github
.gitlab-ci.yml
.circleci

# Docker
Dockerfile*
docker-compose*.yml
.dockerignore

# Misc
*.log
.turbo
```

---

#### File: `templates/docker/.env.example`

```env
# Application
NODE_ENV=development
PORT=3000

# Database (uncomment if using PostgreSQL)
# DATABASE_URL=postgresql://postgres:dev_password_change_in_production@postgres:5432/{{CLIENT_SLUG}}_db

# Redis (uncomment if using)
# REDIS_URL=redis://redis:6379

# Next.js
NEXT_TELEMETRY_DISABLED=1

# Add your app-specific environment variables below
# NEXT_PUBLIC_API_URL=
# NEXT_PUBLIC_APP_URL=
```

---

#### File: `templates/docker/Makefile`

```makefile
.PHONY: help dev dev-all up down build rebuild logs shell clean install

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start Storybook only
	docker compose up storybook

dev-all: ## Start all development services
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up

up: ## Start all services in background
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

down: ## Stop all services
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

build: ## Build all containers
	docker compose build

rebuild: ## Rebuild containers without cache
	docker compose build --no-cache

logs: ## Show logs from all services
	docker compose logs -f

web-logs: ## Show logs from web app
	docker compose logs -f web

storybook-logs: ## Show logs from storybook
	docker compose logs -f storybook

shell: ## Open shell in web container
	docker compose exec web sh

db-shell: ## Open PostgreSQL shell
	docker compose exec postgres psql -U postgres -d {{CLIENT_SLUG}}_db

redis-shell: ## Open Redis CLI
	docker compose exec redis redis-cli

clean: ## Remove all containers, volumes, and images
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v --rmi all

install: ## Install dependencies in container
	docker compose exec web pnpm install

build-ui: ## Build UI package
	docker compose exec web pnpm run build --filter=@{{CLIENT_SLUG}}/ui

migrate: ## Run database migrations (if using Prisma/Drizzle)
	docker compose exec web pnpm run db:migrate

seed: ## Seed database (if using)
	docker compose exec web pnpm run db:seed

test: ## Run tests
	docker compose exec web pnpm run test

lint: ## Run linter
	docker compose exec web pnpm run lint

format: ## Format code
	docker compose exec web pnpm run format
```

---

#### File: `templates/docker/DOCKER.md`

```markdown
# {{CLIENT_NAME}} - Docker Development Guide

## Prerequisites

- Docker Desktop installed
- Git

## Quick Start

### Option 1: Storybook Only (UI Development)
```bash
make dev
# OR
docker compose up storybook
```

Access Storybook at http://localhost:6006

### Option 2: Full Stack Development
```bash
make dev-all
# OR
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

This starts:
- Storybook: http://localhost:6006
- Web App: http://localhost:3000
- API (if configured): http://localhost:3001
- PostgreSQL (if enabled): localhost:5432
- Redis (if enabled): localhost:6379

## Configuration

### 1. Enable Database (PostgreSQL)

Edit `docker-compose.yml` and uncomment the `postgres` service.

Edit `docker-compose.dev.yml` and uncomment:
- `DATABASE_URL` environment variable
- `depends_on: postgres` in your app services

### 2. Enable Redis

Edit `docker-compose.yml` and uncomment the `redis` service.

Edit `docker-compose.dev.yml` and uncomment:
- `REDIS_URL` environment variable
- `depends_on: redis` in your app services

### 3. Add More Apps

Copy the `web` service in `docker-compose.dev.yml` and modify:
- Service name (e.g., `api`, `admin`, `worker`)
- Container name
- Port mapping
- Command filter (e.g., `--filter=api`)

## Common Commands

```bash
make help              # Show all available commands
make dev               # Start Storybook only
make dev-all           # Start all services
make up                # Start all services in background
make down              # Stop all services
make logs              # View all logs
make web-logs          # View web app logs only
make shell             # Open shell in web container
make db-shell          # Open PostgreSQL shell
make redis-shell       # Open Redis CLI
make clean             # Remove everything (fresh start)
make install           # Install dependencies
make build-ui          # Build UI package
make migrate           # Run database migrations
make test              # Run tests
```

## Development Workflow

### Hot Reload
All code changes are automatically hot-reloaded.

### Adding Dependencies
```bash
docker compose exec web pnpm add [package-name]
# OR
make install
```

### Database Migrations
```bash
make migrate
# OR
docker compose exec web pnpm run db:migrate
```

### Running Tests
```bash
make test
# OR
docker compose exec web pnpm run test
```

## Using VS Code Remote Containers

1. Install "Dev Containers" extension in VS Code
2. Open project in VS Code
3. Click "Reopen in Container" when prompted
4. VS Code now runs inside the Docker container with full IntelliSense

## Troubleshooting

### Containers won't start
```bash
make clean    # Remove everything
make build    # Rebuild containers
make up       # Start fresh
```

### Database connection errors
1. Verify PostgreSQL is running: `docker compose ps`
2. Check logs: `docker compose logs postgres`
3. Ensure `DATABASE_URL` is correct in `.env`

### Port conflicts
Stop other services using these ports:
- 3000 (web app)
- 6006 (Storybook)
- 5432 (PostgreSQL)
- 6379 (Redis)

### Slow on macOS
Docker on macOS has performance considerations:
1. Increase Docker Desktop resources (Settings → Resources)
2. Enable VirtioFS file sharing (Settings → General)
3. Consider limiting volume mounts to essential directories only

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

**Never commit `.env` to version control!**

## Production

For production deployment, see `Dockerfile.dev` production stage or use platform-specific configurations (Vercel, Railway, etc.)
```

---

#### File: `templates/docker/.devcontainer/devcontainer.json`

```json
{
  "name": "{{CLIENT_NAME}} Development",
  "dockerComposeFile": [
    "../docker-compose.yml",
    "../docker-compose.dev.yml"
  ],
  "service": "web",
  "workspaceFolder": "/app",
  
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "ms-azuretools.vscode-docker",
        "styled-components.vscode-styled-components",
        "prisma.prisma"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        "tailwindCSS.experimental.classRegex": [
          ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"]
        ]
      }
    }
  },
  
  "forwardPorts": [3000, 6006, 5432, 6379],
  "portsAttributes": {
    "3000": {
      "label": "Web App",
      "onAutoForward": "notify"
    },
    "6006": {
      "label": "Storybook",
      "onAutoForward": "silent"
    },
    "5432": {
      "label": "PostgreSQL",
      "onAutoForward": "silent"
    },
    "6379": {
      "label": "Redis",
      "onAutoForward": "silent"
    }
  },
  
  "postCreateCommand": "pnpm install && pnpm run build --filter=@{{CLIENT_SLUG}}/ui",
  "remoteUser": "node"
}
```

---

### 2.2: Template Placeholders

The generator will replace these placeholders:
- `{{CLIENT_NAME}}` → e.g., "Acme Corp"
- `{{CLIENT_SLUG}}` → e.g., "acme-corp"

---

## Part 3: Integration with Generator

### Goal
Modify the generator to include Docker templates in generated projects.

---

### 3.1: Generator Changes

#### Update: `packages/generator/src/lib/generator.ts`

Add Docker template copying to the generation process:

```typescript
// After creating project structure...

// Copy Docker templates
await copyDockerTemplates({
  targetDir: projectPath,
  clientName: input.clientName,
  clientSlug: input.projectSlug,
});

// Function to copy and process Docker templates
async function copyDockerTemplates(options: {
  targetDir: string;
  clientName: string;
  clientSlug: string;
}) {
  const dockerTemplates = [
    'Dockerfile.dev',
    'docker-compose.yml',
    'docker-compose.dev.yml',
    '.dockerignore',
    '.env.example',
    'Makefile',
    'DOCKER.md',
    '.devcontainer/devcontainer.json',
  ];

  for (const template of dockerTemplates) {
    const templatePath = path.join(__dirname, '../templates/docker', template);
    const targetPath = path.join(options.targetDir, template);
    
    // Read template
    let content = await fs.readFile(templatePath, 'utf-8');
    
    // Replace placeholders
    content = content
      .replace(/{{CLIENT_NAME}}/g, options.clientName)
      .replace(/{{CLIENT_SLUG}}/g, options.clientSlug);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    
    // Write file
    await fs.writeFile(targetPath, content);
  }
  
  console.log('✅ Docker configuration files created');
}
```

---

### 3.2: Generator UI Updates

#### Add Docker Options to Generator Form

```tsx
// In generator form component
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Infrastructure Options</h3>
  
  <div className="space-y-2">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={includeDatabase}
        onChange={(e) => setIncludeDatabase(e.target.checked)}
      />
      <span>Include PostgreSQL Database</span>
    </label>
    
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={includeRedis}
        onChange={(e) => setIncludeRedis(e.target.checked)}
      />
      <span>Include Redis Cache</span>
    </label>
  </div>
  
  <p className="text-sm text-text-secondary">
    These can be enabled later by uncommenting services in docker-compose.yml
  </p>
</div>
```

**Based on selections, generator uncomments relevant services in docker-compose.yml**

---

## Part 4: Testing & Validation

### 4.1: Test Checklist

#### Phase 1: Test Current Project Docker Setup
```bash
cd glueos-ui
docker compose up
```

**Verify:**
- [ ] Generator app loads at http://localhost:3000
- [ ] Storybook loads at http://localhost:6006
- [ ] Example app loads at http://localhost:3001
- [ ] Hot reload works (make a code change)
- [ ] All apps build successfully
- [ ] Can run commands: `make shell`, `make logs`
- [ ] VS Code Remote Containers works

---

#### Phase 2: Test Generated Project
```bash
# Use generator to create test project
# Generated project should include Docker files

cd test-client-project
docker compose up
```

**Verify:**
- [ ] Storybook starts successfully
- [ ] Web app starts successfully
- [ ] Generated Makefile commands work
- [ ] DOCKER.md documentation is accurate
- [ ] `.env.example` has correct variables
- [ ] Can enable PostgreSQL by uncommenting
- [ ] Can enable Redis by uncommenting

---

#### Phase 3: Test Complex Setup
Enable PostgreSQL and Redis in generated project:

```bash
# Uncomment postgres and redis in docker-compose.yml
# Uncomment DATABASE_URL in docker-compose.dev.yml
# Uncomment depends_on

docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

**Verify:**
- [ ] PostgreSQL starts and is healthy
- [ ] Redis starts and is healthy
- [ ] Web app can connect to database
- [ ] Web app can connect to Redis
- [ ] Database persists data (volume works)
- [ ] `make db-shell` works
- [ ] `make redis-shell` works

---

### 4.2: Performance Testing

**Test on macOS (worst case for Docker performance):**

**Metrics to measure:**
- Time to start all containers (cold start)
- Hot reload latency (make code change → see in browser)
- npm install time inside container
- Build time inside container

**Acceptable benchmarks:**
- Cold start: < 2 minutes
- Hot reload: < 2 seconds
- npm install: < 3 minutes (first time), < 30 seconds (cached)

If performance is unacceptable, optimize with:
- Cached volume mounts for node_modules
- Multi-stage build optimization
- Reduce file watching scope

---

## Part 5: Documentation Updates

### 5.1: Update Main README

Add prominent Docker section:

```markdown
# GlueOS UI Toolkit

## Getting Started

### Development (Recommended: Docker)

**Prerequisites:**
- Docker Desktop

**Quick Start:**
```bash
git clone [repo]
cd glueos-ui
docker compose up
```

**Services:**
- Generator: http://localhost:3000
- Storybook: http://localhost:6006
- Example App: http://localhost:3001

**See [DOCKER.md](./DOCKER.md) for complete Docker documentation.**

### Development (Alternative: Local)

**Prerequisites:**
- Node.js 20+
- pnpm 8+

**Setup:**
```bash
pnpm install
pnpm run dev
```
```

---

### 5.2: Create Team Onboarding Guide

#### File: `ONBOARDING.md`

```markdown
# Developer Onboarding Guide

Welcome to the GlueOS team! This guide will get you set up in 15 minutes.

## Prerequisites

Install these once:

1. **Docker Desktop** - https://www.docker.com/products/docker-desktop
2. **Git** - https://git-scm.com/downloads
3. **VS Code** (recommended) - https://code.visualstudio.com/

## Setup

### 1. Clone the Repository
```bash
git clone [repo-url]
cd glueos-ui
```

### 2. Start Development Environment
```bash
docker compose up
```

Wait 2-3 minutes for first-time setup. Then:
- Generator: http://localhost:3000
- Storybook: http://localhost:6006

### 3. VS Code Setup (Optional but Recommended)

Install VS Code extension: "Dev Containers"

In VS Code:
1. Open the project folder
2. Click "Reopen in Container" when prompted
3. VS Code restarts inside the Docker container
4. You now have full IntelliSense, debugging, and terminal access

## Working on Client Projects

When you start working on a client project:

```bash
cd ~/projects/client-name
docker compose up
```

All client projects use the same Docker workflow!

## Common Tasks

### Making Code Changes
Just edit files - hot reload is automatic

### Adding Dependencies
```bash
make shell
pnpm add [package-name]
```

### Viewing Logs
```bash
make logs
```

### Stopping Everything
```bash
make down
```

### Fresh Start (if something breaks)
```bash
make clean
make build
make up
```

## Getting Help

- **Docker Questions:** See [DOCKER.md](./DOCKER.md)
- **Generator Questions:** See [README.md](./README.md)
- **Stuck?** Ask in #dev-help Slack channel

## Next Steps

1. ✅ Read [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow
2. ✅ Review [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the codebase
3. ✅ Pick your first task from project board
```

---

## Part 6: Agent Team Instructions

**When ready to implement, provide this to Claude Code agent team:**

```
MISSION: Dockerize GlueOS Project & Create Generator Templates

CONTEXT:
- Read the full Docker implementation plan
- We're implementing Docker for current project AND creating templates for generator
- Must maintain development experience while adding containerization

PHASES:

PHASE 1: Dockerize Current Project (2 days)
TEAM STRUCTURE:
1. Docker Architect: Design overall Docker strategy
2. Configuration Builder: Create Dockerfile, docker-compose files
3. Makefile Builder: Create convenient Make commands
4. Documentation Writer: Create DOCKER.md and update README
5. VS Code Specialist: Create .devcontainer configuration
6. QA Agent: Test all services, verify hot reload, check performance

DELIVERABLES:
- All files from Part 1.1 created and working
- All services run with `docker compose up`
- Hot reload functional on all apps
- Documentation complete
- Makefile commands working
- VS Code Remote Containers working

PHASE 2: Create Generator Templates (2 days)
TEAM STRUCTURE:
1. Template Architect: Design template structure with placeholders
2. Template Builder: Create all template files from Part 2.1
3. Generator Integration Specialist: Modify generator to copy and process templates
4. UI Builder: Add Docker options to generator form
5. Documentation Writer: Create template DOCKER.md
6. QA Agent: Verify templates generate correctly

DELIVERABLES:
- All template files in `templates/docker/` directory
- Generator copies templates on project creation
- Placeholder replacement working ({{CLIENT_NAME}}, {{CLIENT_SLUG}})
- Optional PostgreSQL/Redis configuration logic
- Template documentation complete

PHASE 3: Testing & Validation (1 day)
TEAM STRUCTURE:
1. Test Coordinator: Run test checklist from Part 4
2. Performance Tester: Measure Docker performance metrics
3. Integration Tester: Generate test project and verify
4. Complex Setup Tester: Test PostgreSQL + Redis configuration
5. Documentation Reviewer: Verify all docs are accurate
6. QA Agent: Final comprehensive validation

DELIVERABLES:
- All tests from Part 4.1 passing
- Performance benchmarks documented
- Test project generated and verified
- Complex setup (with DB) tested
- Team onboarding guide (ONBOARDING.md) created

CRITICAL REQUIREMENTS:
1. Hot reload MUST work in Docker (non-negotiable for dev experience)
2. Volume mounts MUST be optimized (exclude node_modules)
3. Build times MUST be acceptable (< 2 min cold start)
4. All template placeholders MUST be replaced correctly
5. Documentation MUST be complete and accurate
6. Makefile commands MUST be intuitive and helpful

PERFORMANCE TARGETS:
- Cold start: < 2 minutes
- Hot reload: < 2 seconds
- First npm install: < 3 minutes

Begin with Phase 1. Test thoroughly before proceeding to Phase 2.
Report performance metrics at each phase.
```

---

## Summary

**What this plan delivers:**

1. ✅ **Current GlueOS project Dockerized** - Easy setup for contributors
2. ✅ **Docker templates in generator** - Every client project gets Docker automatically
3. ✅ **Flexible configuration** - Simple projects work, complex stacks supported
4. ✅ **Great developer experience** - Hot reload, VS Code integration, convenient commands
5. ✅ **Comprehensive documentation** - Team can onboard in 15 minutes

**Timeline:**
- Phase 1: 2 days (Dockerize current project)
- Phase 2: 2 days (Create generator templates)
- Phase 3: 1 day (Testing and validation)
- **Total: ~1 week**

**After implementation:**
- New contributors: `git clone` → `docker compose up` → productive
- New client projects: Generated with Docker config ready
- Multiple projects: No conflicts, easy switching
- Complex stacks: PostgreSQL, Redis, etc. just work

**Ready to execute after:**
1. ✅ Generator V1.0 is complete
2. ✅ Deployed and tested
3. ✅ First test project validated

This can be fed directly to the agent team when you're ready!

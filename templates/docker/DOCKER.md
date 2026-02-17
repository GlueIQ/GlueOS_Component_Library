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

## Port Range Convention

Each workspace uses its own port range to avoid conflicts when running multiple projects simultaneously:

| Project | Web Apps | Storybook | API/Services |
|---------|----------|-----------|--------------|
| **GlueOS/GlueIQ** | 3000–3099 | 6006 | 3100–3199 |
| **DIRECTV** | 4000–4099 | 6007 | 4100–4199 |

When creating a new workspace, assign a unique range and update the ports in `docker-compose.yml` and `docker-compose.dev.yml` accordingly. This lets you run all workspaces at the same time without conflicts.

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
Each workspace reserves its own port range (see **Port Range Convention** above). If you still hit conflicts:
1. Verify no other workspace is using the same range
2. Check for local services occupying a port: `lsof -i :3000`
3. Adjust the port in `docker-compose.yml` / `docker-compose.dev.yml` and in the matching `apps/*/package.json` `dev` script

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

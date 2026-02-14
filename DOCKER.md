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
- **Web App**: http://localhost:3000
- **Example Project**: http://localhost:3001
- **Project Tracker**: http://localhost:3002
- **Storybook**: http://localhost:6006

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
make web-logs          # View web app logs only
make storybook-logs    # View storybook logs only
make shell             # Open shell in web container
make clean             # Remove everything (fresh start)
```

## Development Workflow

### Making Changes
All code changes are hot-reloaded automatically via volume mounts.

### Installing Dependencies
```bash
make install
# OR
docker compose exec web pnpm install
```

### Building UI Package
```bash
make build-ui
# OR
docker compose exec web pnpm run build --filter=@repo/ui
```

### Running Commands in Container
```bash
docker compose exec web pnpm run [command]
```

### Running Individual Services
If you only want to run specific services:

```bash
# Just Storybook
docker compose up storybook

# Just Web app
docker compose up web

# Web app and Storybook
docker compose up web storybook
```

## Using VS Code Remote Containers

1. Install "Dev Containers" extension
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
Stop other services using ports 3000, 3001, 3002, or 6006

### Performance issues on macOS
Docker on macOS can be slow. Consider:
- Increase Docker Desktop resources (CPU/Memory)
- Use Docker Desktop with VirtioFS (faster file sharing)
- Enable "Use Rosetta for x86_64/amd64 emulation on Apple Silicon" in Docker Desktop settings

### Out of memory errors
If you encounter memory issues during builds:
```bash
# Increase Docker memory in Docker Desktop → Settings → Resources
# Or build services individually
docker compose build web
docker compose build storybook
```

## Architecture

### Services
- **web**: Main Next.js application (port 3000)
- **example-project**: Example Next.js app (port 3001)
- **project-tracker**: Project tracker Next.js app (port 3002)
- **storybook**: Component library documentation (port 6006)

### Volumes
All services share the same codebase via volume mounts, with `node_modules` excluded for performance. Changes to code are immediately reflected in all containers.

### Network
All services are connected via the `glueos-network` bridge network, allowing inter-service communication.

## Performance Tips

1. **Use volume exclusions**: The `docker-compose.yml` excludes `node_modules` directories from volume mounts for better performance
2. **Selective service startup**: Only start the services you need
3. **Build caching**: Docker caches layers, so subsequent builds are faster
4. **Resource allocation**: Allocate more CPU and memory to Docker Desktop for better performance

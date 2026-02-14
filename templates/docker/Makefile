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

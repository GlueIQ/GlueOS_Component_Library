.PHONY: help up down build rebuild logs shell clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

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

web-logs: ## Show logs from web app only
	docker compose logs -f web

storybook-logs: ## Show logs from storybook only
	docker compose logs -f storybook

example-logs: ## Show logs from example app only
	docker compose logs -f example

tracker-logs: ## Show logs from project-tracker only
	docker compose logs -f project-tracker

shell: ## Open shell in web container
	docker compose exec web sh

clean: ## Remove all containers, volumes, and images
	docker compose down -v --rmi all

install: ## Install dependencies in container
	docker compose exec web pnpm install

build-ui: ## Build UI package
	docker compose exec web pnpm run build --filter=@repo/ui

test: ## Run tests
	docker compose exec web pnpm run test

lint: ## Run linter
	docker compose exec web pnpm run lint

format: ## Format code
	docker compose exec web pnpm run format

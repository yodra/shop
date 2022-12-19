.DEFAULT_GOAL := help

help:
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Configure the project for the first time
	@echo "Initialising the project"
	@npm install

start: ## Execute the project on local environment
	@echo "🏃‍♀️ Running the project"
	@npm run dev

up: ## Execute the project on docker
	@echo "🏃‍♀️ Running the project on docker"
	@docker-compose up -d --build

up_services: ## Execute the integration services
	@echo "🏃‍♀️ Running services"
	@docker-compose up -d database

down: ## Stop and remove containers
	@echo "🛑️ Stopping the project and removing containers"
	@docker-compose down

test: ## Run the test
	@echo "🧪 Running test"
	@npm run test

test-watch: ## Run the test watch mode
	@echo "🧪 Running test watch mode"
	@npm run test-watch

clean: ## Remove the `dist` folder
	@echo "🧹 Cleaning"
	@rm -rf dist

clean_all: clean ## Remove the `package-lock.json`, `node_modules` and `dist` folders
	@echo "🧨 Cleaning all"
	@rm -rf node_modules package-lock.json

migrate_create: ## Create a new migration. Example: `make migrate_create migration=create-basic-users`
	@echo "🗄️ Creating migration"
	@./node_modules/.bin/migrate-mongo create $(migration)

migrate_up: ## Execute the migrations
	@echo "📂 Running migrations"
	@./node_modules/.bin/migrate-mongo up

migrate_down: ## Execute rollback the last migration
	@echo "↩️️ Rollback the last migration"
	@./node_modules/.bin/migrate-mongo down

migrate_status: ## Show the status of migrations
	@echo "👀 Status migrations"
	@./node_modules/.bin/migrate-mongo status

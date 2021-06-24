init:
	@echo "Initialising the project"
	@npm install

start:
	@echo "🏃‍♀️ Running the project"
	@npm run dev

up:
	@echo "🏃‍♀️ Running the project on docker"
	@docker-compose up -d --build

up_services:
	@echo "🏃‍♀️ Running services"
	@docker-compose up -d database

down:
	@echo "🛑️ Stopping the project and removing containers"
	@docker-compose down

test:
	@echo "🧪 Running test"
	@npm run test

clean:
	@echo "🧹 Cleaning"
	@rm -rf dist

clean_all: clean
	@echo "🧨 Cleaning all"
	@rm -rf node_modules package-lock.json

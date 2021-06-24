init:
	@echo "Initialising the project"
	@npm install

build:
	@echo "️👷‍♀️ Building the project"
	@npm run build

start: build
	@echo "🏃‍♀️ Running the project"
	@npm run start

up:
	@echo "🏃‍♀️ Running the project on docker"
	@docker run -p 3000:3000 shop

test:
	@echo "🧪 Running test"
	@npm run test

clean:
	@echo "🧹 Cleaning"
	@rm -rf dist

clean_all: clean
	@echo "🧨 Cleaning all"
	@rm -rf node_modules package-lock.json

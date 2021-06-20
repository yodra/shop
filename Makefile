init:
	@echo "Initialising the project"
	@npm install

build:
	@echo "️👷‍♀️ Building the project"
	@npm run build

up: build
	@echo "🏃‍♀️ Running the project"
	@npm run start

test:
	@echo "🧪 Running test"
	@npm run test

clean:
	@echo "🧹 Cleaning"
	@rm -rf dist

clean_all: clean
	@echo "🧨 Cleaning all"
	@rm -rf node_modules package-lock.json

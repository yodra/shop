init:
	@echo "Initialising the project"
	@npm install

build:
	@echo "️👷‍♀️ Building the project"
	@npm run build

up: build
	@echo "🏃‍♀️ Running the project"
	@npm run start

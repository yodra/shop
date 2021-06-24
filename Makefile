init:
	@echo "Initialising the project"
	@npm install

start:
	@echo "🏃‍♀️ Running the project"
	@npm run dev

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

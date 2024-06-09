# Makefile

# Define default make target
all: install build start

# Install dependencies for both frontend and backend
install:
	cd frontend && npm install
	cd backend && npm install

# Build both frontend and backend
build:
	cd backend && npm run build
	cd frontend && npm run build

# Start both frontend and backend servers
start:
	cd backend && npm start &
	cd frontend && npm start &

.PHONY: install build start

# Start Docker services
docker-up:
	docker-compose up -d

# Stop Docker services
docker-down:
	docker-compose down

#!/bin/bash

# Check if a valid number of containers is provided
if [ -z "$1" ]; then
  echo "Usage: ./deploy_icecream_api.sh <number_of_containers>"
  exit 1
fi

# Get the number of containers to deploy
NUM_CONTAINERS=$1

# Ensure the number is between 1 and 10
if [[ $NUM_CONTAINERS -lt 1 || $NUM_CONTAINERS -gt 10 ]]; then
  echo "Error: Number of containers must be between 1 and 10."
  exit 1
fi

# Deploy the containers using Docker Compose
echo "Deploying $NUM_CONTAINERS containers of IceCream API..."
docker-compose up --scale app=$NUM_CONTAINERS -d

# List the running containers
echo "Running containers:"
docker ps --filter "name=app"

# Show mapped ports
echo "Mapped ports:"
docker-compose ps
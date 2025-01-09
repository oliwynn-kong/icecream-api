#!/bin/bash

# Function to remove a specific number of containers
remove_specific() {
  NUM_CONTAINERS=$1
  echo "Removing $NUM_CONTAINERS IceCream API containers..."

  CONTAINERS=$(docker ps --filter "name=app" -q | head -n $NUM_CONTAINERS)
  if [[ -z "$CONTAINERS" ]]; then
    echo "No IceCream API containers found to remove."
    exit 1
  fi

  echo "Stopping and removing the following containers:"
  echo "$CONTAINERS"
  docker rm -f $CONTAINERS
}

# Function to remove all containers
remove_all() {
  echo "Removing all IceCream API containers..."
  docker-compose down --volumes --remove-orphans

  # Check for any lingering containers with "app" in the name
  CONTAINERS=$(docker ps --filter "name=app" -q)
  if [[ -n "$CONTAINERS" ]]; then
    echo "Force removing remaining containers..."
    docker rm -f $CONTAINERS
  else
    echo "No remaining containers found."
  fi
}

# Parse arguments
if [[ "$1" == "--all" ]]; then
  remove_all
elif [[ "$1" =~ ^[0-9]+$ ]]; then
  if [[ $1 -lt 1 ]]; then
    echo "Error: Number of containers must be greater than 0."
    exit 1
  fi
  remove_specific $1
else
  echo "Usage: ./remove_icecream_api.sh <number_of_containers> | --all"
  exit 1
fi

# Optional: Remove the built image
read -p "Do you also want to remove the IceCream API image? (y/n): " REMOVE_IMAGE
if [[ "$REMOVE_IMAGE" == "y" ]]; then
  docker rmi icecream-api
  echo "IceCream API image removed."
else
  echo "IceCream API image retained."
fi

echo "Cleanup complete."
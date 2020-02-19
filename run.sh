#!/bin/bash

check_error() {
  if [ "$1" -ne 0 ]; then
    echo "Build Failed!"
    exit "$1"
  fi
}

echo "Building and Starting the Server in DEVELOPMENT Mode"
echo

# Build and Package the JAVA Server

mvn -f server clean package
check_error $?

# Check if Node Modules are Installed

if [ ! -d "./client/node_modules" ]; then
  npm install --prefix client
  check_error $?
fi

# Build and Run The Client / Run The Server

npm run dev --prefix client
check_error $?

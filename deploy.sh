#!/bin/bash

check_error() {
  if [ "$1" -ne 0 ]; then
    echo "Build Failed!"
    exit "$1"
  fi
}

echo "Building the Server for PRODUCTION"
echo

# Check if Node Modules are Installed

if [ ! -d "./client/node_modules" ]; then
  npm install --prefix client
  check_error $?
fi

# Build The Client

npm run prod --prefix client
check_error $?

# Build and Package the JAVA Server

mvn -f server clean package
check_error $?
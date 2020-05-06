#!/bin/bash

check_error() {
  if [ "$1" -ne 0 ]; then
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

if [ -z "$TRAVIS" ]; then
  npm run test --prefix client
  check_error $?
fi

npm run prodClient --prefix client
check_error $?

# Build and Package the JAVA Server

if [ -z "$TRAVIS" ]; then

  mvn -f server --global-settings server/.m2/settings.xml clean verify
  check_error $?

else

  mvn -f server --global-settings server/.m2/settings.xml -DskipTests verify
  check_error $?

fi

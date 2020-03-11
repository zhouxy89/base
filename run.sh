#!/bin/bash

check_error() {
  if [ "$1" -ne 0 ]; then
    exit "$1"
  fi
}

if [ -z "$CS314_RUN_MODE" ]; then
  export CS314_RUN_MODE=dev
fi

if [[ "$CS314_RUN_MODE" == "dev" ]]; then

	echo "Building and Starting the Server in DEVELOPMENT Mode."
	echo

  # Build and Package the JAVA Server

  mvn -f server --global-settings server/.m2/settings.xml clean package
  check_error $?

  # Check if Node Modules are Installed

  if [ ! -d "./client/node_modules" ]; then
    npm install --prefix client
    check_error $?
  fi

  # Build and Run The Client / Run The Server

  npm run test --prefix client
  check_error $?

  npm run dev --prefix client
  check_error $?

else

	echo "Building and Starting the Server in PRODUCTION Mode."
  echo

  # Build and Package the JAVA Server With Client

  ./deploy.sh

  # Run The Server

  npm run server --prefix client
  check_error $?

fi

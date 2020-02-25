#!/bin/bash

check_error() {
  if [ "$1" -ne 0 ]; then
    exit "$1"
  fi
}

if [ -z "$CS314_MODE" ]; then
  export CS314_MODE=dev
fi

if [[ "$CS314_MODE" == "dev" ]]; then

	echo "Building and starting the server in DEVELOPMENT mode."
	echo

  # Build and Package the JAVA Server

  mvn -f ./server clean package
  check_error $?

  # Check if Node Modules are Installed

  if [ ! -d "./client/node_modules" ]; then
    npm install --prefix client
    check_error $?
  fi

  # Build and Run The Client / Run The Server

  npm run dev --prefix client
  check_error $?

else

	echo "Building and starting the server in PRODUCTION mode."
  echo

  # Build and Package the JAVA Server With Client

  ./deploy.sh

  # Run The Server

  npm run server --prefix client
  check_error $?

fi





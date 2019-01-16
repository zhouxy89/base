#!/bin/bash

if [ ! -d "./client/node_modules" ]; then
  ./install_dependencies.sh
  ./webpack.sh
fi
./build_jar.sh
./start_server.sh
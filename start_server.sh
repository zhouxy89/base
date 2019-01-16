#!/bin/bash

if [ -z "$PORT" ]; then
  PORT=8088
fi
if [ -z "$LOGLEVEL" ]; then
  LOGLEVEL=info
fi
if [ -z "$3" ]; then
  PACKAGE=com.tripco
fi
printf "java -Dorg.slf4j.simpleLogger.log.$PACKAGE=$LOGLEVEL -jar target/server-*.jar $PORT\n\n"
java -Dorg.slf4j.simpleLogger.log.$PACKAGE=$LOGLEVEL -jar target/server-*.jar $PORT
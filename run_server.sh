#!/bin/bash

if [ -z "$PORT" ]; then
  PORT=8088
fi
if [ -z "$LOGLEVEL" ]; then
  LOGLEVEL=info
fi
if [ -z "$PACKAGE" ]; then
  PACKAGE=log.com.tripco
fi
printf "java -Dorg.slf4j.simpleLogger.$PACKAGE=$LOGLEVEL -jar target/server-*.jar $PORT $KEYSTORE_FILE $KEYSTORE_PASSWORD\n\n"
java -Dorg.slf4j.simpleLogger.$PACKAGE=$LOGLEVEL -jar target/server-*.jar $PORT $KEYSTORE_FILE $KEYSTORE_PASSWORD
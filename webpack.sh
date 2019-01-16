#!/bin/bash

# 'npm run' means look in the client/package.json file's scripts property called bundle and run whatever that is.
# in this case, it runs:
#   cross-env webpack --config ./webpack.prod.config.js --progress --colors && cp index.html favicon.ico dist/public
# need to explain what this does...
npm run bundle --prefix client

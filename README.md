# React-Spark-Starter
## Starting the production server
The easiest way to run the server and make sure everything works is to use the run script:
    
    ./run [port]
This will install all npm dependencies, bundle together all of the Javascript and Java code, and start running the server on the specified port. A default will be used if one is not specified. Note that if you change the default port, you'll need to change the `const port = 8088;` line near the top of `client/webpack.prod.config.js` before running the script.

## Using the development server
The Webpack dev server allows you to make changes to your Javascript code without repackaging it. To use it:

    mvn package                             # Package Java code
    java -jar target/server-0.1.jar [port]  # Start the Java server on the specified port
    In another terminal:
    # Adjust the const port = 33000; line in client/webpack.dev.config.js to match the specified port
    npm --prefix client install             # Install npm dependencies (only necessary the first time and on dependency changes)
    npm --prefix client run test            # Start the test server. It should automatically start a web browser with your page
It's recommended you use a consistent port when starting the Java server, because you need to edit `client/webpack.dev.config.js` each time you change ports. 

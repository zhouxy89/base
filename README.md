# React-Spark-Starter
## Starting the server
Navigate to the server folder:

    cd server
    
Install Maven dependencies and create a .jar:

    mvn package
    
Run the jar. If you don't have static files, ./ works for path_to_static_files, server_name can be your team name:

    java -cp target/TripCo-0.0.1-SNAPSHOT-jar-with-dependencies.jar [port] [path_to_static_files] [server_name]
    
## Starting the client
Navigate to the client folder:

    cd client
    
Install npm dependencies:

    npm install
    
Start the npm development server. This is for testing only. You will deploy your code through a different method:

    npm run start:dev
    
This should automatically open the web page in your browser.

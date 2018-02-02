# React-Spark-Starter
## Requirements
You must have Maven, a build tool for Java, and npm, a dependency manager for Javascript development, installed. **The lab machines already have these tools installed.**
### Installing Maven:
First, check to see if you already have Maven installed:

    mvn -v
#### Mac installation
The easiest way to install Maven on Macs is to use the Homebrew package manager for OSX. Homebrew allows you to install programs from the command line, just like Linux. To install Homebrew:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
If the installation failed, ensure you meet the installation requirements [here](https://docs.brew.sh/Installation.html). The page also has alternative installation instructions if the above doesn't work. Once Homebrew is installed, install Maven with:

    brew update
    brew install maven
#### Linux installation
Maven should be available for install through the package manager of whatever distro you use. 
### Installing npm
First, check to see if npm is already installed:

    node -v
    npm -v # Both should output version information
npm is distributed with NodeJS. Installing Node will also install npm on your computer.
#### Mac installation
As with Maven, it is easiest to install npm using Homebrew:
    
    brew install node
#### Linux installation 
Find instructions for your particular distro [here](https://nodejs.org/en/download/package-manager/).
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

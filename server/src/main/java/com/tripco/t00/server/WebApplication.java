package com.tripco.t00.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;

/** The server for the single page web application. */
public class WebApplication {

  final static Logger log = LoggerFactory.getLogger(WebApplication.class);

  public static void main(String[] commandLineArguments) {

    if (commandLineArguments.length > 1) {
      log.error("Too many command line arguments given. Expected 1 but found {}.", commandLineArguments.length);
      System.exit(1);
    }

    Integer serverPort = getServerPort(commandLineArguments);
    HashMap<String, String> keystoreData = getKeystoreFromEnvironment();
    String keystoreFile = keystoreData.get("filePath");
    String keystorePassword = keystoreData.get("password");

    if (keystoreFile != null) { log.info("Keystore file: {}", keystoreFile); }
    if (keystorePassword != null) { log.info("Keystore password: {}", keystorePassword); }

    if ( validTcpIpPortNumber(serverPort) ) {
      MicroServer server = new MicroServer(serverPort, keystoreFile, keystorePassword);  // constructor never returns
    }
    else {
      log.error("Port number argument {} not a valid TCP/IP port.", serverPort);
    }
  }


  private static int getServerPort(String[] commandLineArguments) {

    Integer serverPort = 8088;
    if (commandLineArguments.length > 0) {
      try {
        serverPort = Integer.parseInt(commandLineArguments[0]);
      } catch (Exception e) {
        log.error("Error converting server port: {}", e);
      }
    }
    log.info("Server port: {}", serverPort);
    return serverPort;
  }

  private static HashMap<String, String> getKeystoreFromEnvironment() {
    HashMap<String, String> keystoreData = new HashMap<>();
    keystoreData.put("filePath", System.getenv("KEYSTORE_FILE"));
    keystoreData.put("password", System.getenv("KEYSTORE_PASSWORD"));
    return keystoreData;
  }

  private static boolean validTcpIpPortNumber(int portNumber) {
    return (portNumber >= 0 & portNumber <= 65535);
  }
}
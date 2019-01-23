package com.tripco.t00.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** The server for the single page web application. */
public class WebApplication {

  final static Logger log = LoggerFactory.getLogger(WebApplication.class);

  public static void main(String[] commandLineArguments) {

    Integer serverPort = getServerPort(commandLineArguments);
    String keystoreFile = getKeystoreFile();
    String keystorePassword = getKeystorePassword();

    if ( validTcpIpPortNumber(serverPort) ) {
      MicroServer server = new MicroServer(serverPort, keystoreFile, keystorePassword);
      // never returns
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

  private static String getKeystoreFile() {
    String keystoreFile = System.getenv("KEYSTORE_FILE");
    if (keystoreFile != null) {
      log.info("Keystore file: {}", keystoreFile);
    }
    return keystoreFile;
  }

  private static String getKeystorePassword() {
    String keystorePassword = System.getenv("KEYSTORE_PASSWORD");
    if (keystorePassword != null) {
      log.info("Keystore password: {}", keystorePassword);
    }
    return keystorePassword;
  }

  private static boolean validTcpIpPortNumber(int portNumber) {
    return (portNumber >= 0 & portNumber <= 65535);
  }
}
package com.tripco.t00.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** The server for the single page web application. */
public class WebApplication {

  public static void main(String[] args) {

    final Logger log = LoggerFactory.getLogger(WebApplication.class);

    Integer serverPort = getServerPort(args);
    String keystoreFile = getKeystoreFile(args);
    String keystorePassword = getKeystorePassword(args);

    if ( validTcpIpPortNumber(serverPort) ) {
      MicroServer server = new MicroServer(serverPort, keystoreFile, keystorePassword);
      // never returns
    }
    else {
      log.error("Port number argument {} not a valid TCP/IP port.", serverPort);
    }
  }


  private static int getServerPort(String[] args) {

    final Logger log = LoggerFactory.getLogger(WebApplication.class);

    Integer serverPort = 8088;
    if (args.length > 0) {
      try {
        serverPort = Integer.parseInt(args[0]);
      } catch (Exception e) {
        log.error("Error converting server port: {}", e);
      }
    }
    log.info("Server port: {}", serverPort);
    return serverPort;
  }

  private static String getKeystoreFile(String[] args) {

    final Logger log = LoggerFactory.getLogger(WebApplication.class);

    if (args.length == 3) {
      String keystoreFile = args[1];
      log.info("Keystore file: {}", keystoreFile);
      return keystoreFile;
    }
    else {
      return null;
    }
  }

  private static String getKeystorePassword(String[] args) {

    final Logger log = LoggerFactory.getLogger(WebApplication.class);

    if (args.length == 3) {
      String keystorePassword = args[2];
      log.info("Keystore password: {}", keystorePassword);
      return keystorePassword;
    }
    else {
      return null;
    }
  }

  private static boolean validTcpIpPortNumber(int portNumber) {
    return (portNumber >= 0 & portNumber <= 65535);
  }
}
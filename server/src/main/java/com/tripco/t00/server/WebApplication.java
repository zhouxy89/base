package com.tripco.t00.server;

/** The server for the single page web application. */
public class WebApplication {

  public static void main(String[] args) {
    MicroServer server = new MicroServer(getServerPort(args));
    // never returns
  }


  private static int getServerPort(String[] args) {
    final int defaultServerPort = 8088;
    if (args.length > 0)
      // @todo check for an error
      return Integer.parseInt(args[0]);
    else
      return defaultServerPort;

  }

}
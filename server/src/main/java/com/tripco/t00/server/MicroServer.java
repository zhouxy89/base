package com.tripco.t00.server;

import com.google.gson.Gson;

import com.tripco.t00.planner.Trip;
import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.*;


/** A simple micro-server for the web.  Just what we need, nothing more.
 *
 */
public class MicroServer {

  private int    port = 0;
  private String path = "/public";
  private String name = "";

  /** Creates a micro-server to load static files and provide REST APIs.
   *
   * @param port
   * @param path
   * @param name
   */
  MicroServer(int port, String path, String name) {
    port(port);
    System.out.println("\n\nServer running on port: " + port + "\n\n");
    Spark.staticFileLocation(this.path);

    // register all micro-services and the function that services them.
    get("/about", this::about);
    get("/echo", this::echo);
    get("/hello/:name", this::hello);
    // client is sending data, so a post is used instead of a get
    post("/plan", this::plan);
  }

  /** A REST API that describes the server.
   *
   * @param request
   * @param response
   * @return
   */
  private String about(Request request, Response response) {

    response.type("text/html");

    return "<html><head></head><body><h1>"+name+" Micro-server on port "+port+"</h1></body></html>";
  }

  /** A REST API demonstrating the use of a parameter.
   *
   * @param request
   * @param response
   * @return
   */
  private String hello(Request request, Response response) {

    response.type("text/html");

    return Greeting.html(request.params(":name"));
  }

  /** A REST API that echos the client request.
   *
   * @param request
   * @param response
   * @return
   */
  private String echo(Request request, Response response) {

    response.type("application/json");

    Gson gson = new Gson();
    /* wouldn't it be cool if this worked?  Alas, ...
    Gson gson = new Gson();
    return gson.toJson(request);
    */

    return HTTP.echoRequest(request);
  }


  /**
   *
   * @param request
   * @param response
   * @return
   */
  private String plan(Request request, Response response) {
    Gson gson = new Gson();

    response.type("application/json");

    return gson.toJson(new Trip(request));
  }
}
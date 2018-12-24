package com.tripco.t00.server;

import com.google.gson.Gson;

import com.tripco.t00.planner.TIPDistance;

import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.*;


/** A micro server for a single page web application that serves the static files
 * and processes restful API requests.
 */
class MicroServer {
  private int    port;
  private String name;
  private String path = "/public/";


  MicroServer(int port, String name) {
    this.port = port;
    this.name = name;

    port(port);
    secureCommunications();
    serveStaticPages();
    processRestfulAPIrequests();

    System.out.println("\n\nServer running on port: " + this.port + "\n\n");
  }

  private void secureCommunications() {

  }

  private void serveStaticPages() {
    Spark.staticFileLocation(this.path);
    Spark.get("/", (req, res) -> { res.redirect("index.html"); return null; });
  }


  private void processRestfulAPIrequests() {
    Spark.get("/echo", this::echoHTTPrequest);
    Spark.get("/config", this::processTIPconfigRequest);
    Spark.post("/distance", this::processTIPdistanceRequest);
  }


  private String processTIPconfigRequest(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return Config.buildResponse();
  }


  private String echoHTTPrequest(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return HTTP.echoRequest(request);
  }


  private String processTIPdistanceRequest(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    Gson gson = new Gson();
    TIPDistance distance = gson.fromJson(request.body(), TIPDistance.class);
    distance.buildResponse();

    return gson.toJson(distance);
  }

}
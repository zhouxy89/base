package com.tripco.t00.server;

import com.google.gson.Gson;

import com.tripco.t00.TIP.TIPConfig;
import com.tripco.t00.TIP.TIPDistance;
import com.tripco.t00.TIP.TIPHeader;

import java.lang.reflect.Type;

import spark.Request;
import spark.Response;
import spark.Spark;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/** A micro server for a single page web application that serves the static files
 * and processes restful API requests.
 */
class MicroServer {

  private final Logger log = LoggerFactory.getLogger(MicroServer.class);


  MicroServer(int serverPort) {
    configureServer(serverPort);
    serveStaticPages();
    processRestfulAPIrequests();

    log.info("Server running on serverPort: " + serverPort);
  }


  private void configureServer(int serverPort) {
    Spark.port(serverPort);
    // @todo secure, others
    log.debug("Port configuration complete");
  }


  private void serveStaticPages() {
    String path = "/public/";
    Spark.staticFileLocation(path);
    Spark.get("/", (req, res) -> { res.redirect("index.html"); return null; });
    log.debug("Static file configuration complete");
  }


  private void processRestfulAPIrequests() {
    Spark.get("/api/config", this::processTIPconfigRequest);
    Spark.post("/api/distance", this::processTIPdistanceRequest);
    Spark.get("/api/echo", this::echoHTTPrequest);
    log.debug("Restful configuration complete");
  }


  private String processTIPconfigRequest(Request request, Response response) {
    log.info(HTTPrequestToJson(request));
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      TIPConfig tipRequest = new TIPConfig();
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.debug("Response - "+responseBody);
      return responseBody;
    } catch (Exception e) {
      // @todo distinguish bad request 400 from server error 500
      log.debug("Exception - "+e.toString());
      response.status(500);
      return request.body();
    }
  }


  private String processTIPdistanceRequest(Request request, Response response) {
    return processTIPrequest(TIPDistance.class, request, response);
  }


  private String processTIPrequest(Type tipType, Request request, Response response) {
    log.info("Request - "+HTTPrequestToJson(request));
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      TIPHeader tipRequest = jsonConverter.fromJson(request.body(), tipType);
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.debug("Response - "+responseBody);
      return responseBody;
    } catch (Exception e) {
      // @todo distinguish bad request 400 from server error 500
      log.debug("Exception - "+e.toString());
      response.status(500);
      return request.body();
    }
  }


  private String echoHTTPrequest(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    return HTTPrequestToJson(request);
  }


  private String HTTPrequestToJson(Request request) {
    return "{\n"
        + "\"attributes\":\"" + request.attributes() + "\",\n"
        + "\"body\":\"" + request.body() + "\",\n"
        + "\"contentLength\":\"" + request.contentLength() + "\",\n"
        + "\"contentType\":\"" + request.contentType() + "\",\n"
        + "\"contextPath\":\"" + request.contextPath() + "\",\n"
        + "\"cookies\":\"" + request.cookies() + "\",\n"
        + "\"headers\":\"" + request.headers() + "\",\n"
        + "\"host\":\"" + request.host() + "\",\n"
        + "\"ip\":\"" + request.ip() + "\",\n"
        + "\"params\":\"" + request.params() + "\",\n"
        + "\"pathInfo\":\"" + request.pathInfo() + "\",\n"
        + "\"serverPort\":\"" + request.port() + "\",\n"
        + "\"protocol\":\"" + request.protocol() + "\",\n"
        + "\"queryParams\":\"" + request.queryParams() + "\",\n"
        + "\"requestMethod\":\"" + request.requestMethod() + "\",\n"
        + "\"scheme\":\"" + request.scheme() + "\",\n"
        + "\"servletPath\":\"" + request.servletPath() + "\",\n"
        + "\"session\":\"" + request.session() + "\",\n"
        + "\"uri()\":\"" + request.uri() + "\",\n"
        + "\"url()\":\"" + request.url() + "\",\n"
        + "\"userAgent\":\"" + request.userAgent() + "\"\n"
        + "}";
  }


}

package com.tripco.t00.server;

import com.google.gson.Gson;

import com.tripco.t00.TIP.TIPConfig;
import com.tripco.t00.TIP.TIPDistance;
import com.tripco.t00.TIP.TIPHeader;

import java.lang.reflect.Type;

import spark.Request;
import spark.Response;
import spark.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/** A micro server for a single page web application that serves the static files
 * and processes restful API requests.
 */
class MicroServer {

  private final Logger log = LoggerFactory.getLogger(MicroServer.class);
  private Service http;
  private Service https;


  MicroServer(int serverPort) {
    configureServer(serverPort);
    serveStaticPages();
    processRestfulAPIrequests();
    log.info("MicroServer running on port: {}", serverPort);
  }


  private void configureServer(int serverPort) {
    // @todo secure, others
    http = Service.ignite().port(7088);
    https = Service.ignite()
            .port(serverPort)
            .secure("server/deploy/clientkeystore", "password", null, null);
    log.trace("Server configuration complete");
  }


  private void serveStaticPages() {
    // these redirects shouldn't really have 'localhost', since the client will then try to browse to localhost
    // which may be different.  But these are coming out of the final pull request.
    // Keeping this here in a commit, for the sake of a working example running/browsing on the dev server.
    http.get("/", (req, res) -> {res.redirect("https://localhost:8088"); return null; });
    http.get("/*", (req, res) -> {res.redirect("https://localhost:8088/" + req.splat()[0]); return null; });
    String path = "/public/";
    https.staticFileLocation(path);
    https.get("/", (req, res) -> { res.redirect("index.html"); return null; });
    log.trace("Static file configuration complete");
  }


  private void processRestfulAPIrequests() {
    https.get("/api/config", this::processTIPconfigRequest);
    https.post("/api/distance", this::processTIPdistanceRequest);
    https.get("/api/echo", this::echoHTTPrequest);
    log.trace("Restful configuration complete");
  }


  private String processTIPconfigRequest(Request request, Response response) {
    log.info("TIP Config request: {}", HTTPrequestToJson(request));
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      TIPConfig tipRequest = new TIPConfig();
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.trace("TIP Config response: {}", responseBody);
      return responseBody;
    } catch (Exception e) {
      // @todo distinguish bad request 400 from server error 500
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
  }


  private String processTIPdistanceRequest(Request request, Response response) {
    return processTIPrequest(TIPDistance.class, request, response);
  }


  private String processTIPrequest(Type tipType, Request request, Response response) {
    log.info("TIP Request: {}", HTTPrequestToJson(request));
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      TIPHeader tipRequest = jsonConverter.fromJson(request.body(), tipType);
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.trace("TIP Response: {}", responseBody);
      return responseBody;
    } catch (Exception e) {
      // @todo distinguish bad request 400 from server error 500
      log.error("Exception: {}", e);
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

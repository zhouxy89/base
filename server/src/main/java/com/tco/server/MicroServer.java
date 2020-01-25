package com.tco.server;

import com.google.gson.Gson;

import com.tco.RequestConfig;
import com.tco.RequestHeader;
import com.tco.misc.JSONValidator;

import java.io.IOException;
import java.lang.reflect.Type;
import spark.Request;
import spark.Response;
import spark.Spark;
import static spark.Spark.secure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;


/** A micro server for a single page web application that serves the static files
 * and processes restful API requests.
 */
class MicroServer {

  private final Logger log = LoggerFactory.getLogger(MicroServer.class);
  private DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");


  MicroServer(int serverPort) {
    configureServer(serverPort);
    serveStaticPages();
    processRestfulAPIrequests();
    log.info("MicroServer running on port: {}", serverPort);
  }


  private void configureServer(int serverPort) {
    Spark.port(serverPort);
    String keystoreFile = System.getenv("KEYSTORE_FILE");
    String keystorePassword = System.getenv("KEYSTORE_PASSWORD");
    if (keystoreFile != null && keystorePassword != null) {
      secure(keystoreFile, keystorePassword, null, null);
      log.info("Keystore file: {}", keystoreFile);
      log.info("Keystore password: {}", keystorePassword);
      log.info("MicroServer using HTTPS.");
    }
    else {
      log.info("MicroServer using HTTP.");
    }
    log.trace("Server configuration complete");
  }


  private void serveStaticPages() {
    String path = "/public/";
    Spark.staticFileLocation(path);
    Spark.get("/", (req, res) -> { res.redirect("index.html"); return null; });
    log.trace("Static file configuration complete");
  }


  private void processRestfulAPIrequests() {
    Spark.get("/api/config", this::processTIPconfigRequest);
  }


  private String processTIPconfigRequest(Request request, Response response) {
    logRequest(request);
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      RequestConfig tipRequest = new RequestConfig();
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.trace("TIP Config response: {}", responseBody);
      return responseBody;
    } catch (Exception e) {
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
  }


  private String processTIPrequest(Type tipType, Request request, Response response) {
    logRequest(request);
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);

    try {
      Gson jsonConverter = new Gson();
      RequestHeader tipInstance = createTIPInstance(tipType, request);
      tipInstance.buildResponse();
      String responseBody = jsonConverter.toJson(tipInstance);
      log.trace("TIP Response: {}", responseBody);
      return responseBody;

    } catch (IOException e) {
      log.error("TIP request failed validation: {}", request.body());
      log.error("Reason for failure: {}", e.getMessage());
      response.status(400);
      return null;
    } catch (Exception e) {
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
  }


  private void logRequest(Request request) {
    String message = "TIP Request - "
            + "[" + dateTimeFormat.format(LocalDateTime.now()) + "] "
            + request.ip() + " "
            + "\"" + request.requestMethod() + " "
            + request.pathInfo() + " "
            + request.protocol() + "\" "
            + "[" + request.body() + "]";
    log.error(message);
  }


  // Throws an IOException if something went wrong with loading the schema or validating the request.
  private RequestHeader createTIPInstance(Type classType, Request request) throws IOException {
    JSONValidator.validate(classType, request.body()); // Validates request against JSON schema
    Gson jsonConverter = new Gson();
    return jsonConverter.fromJson(request.body(), classType);
  }

}

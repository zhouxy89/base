package com.tco.server;

import com.google.gson.Gson;

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
  }


  private void serveStaticPages() {
    String path = "/public/";
    Spark.staticFileLocation(path);
    Spark.get("/", (req, res) -> { res.redirect("index.html"); return null; });
  }


  private void processRestfulAPIrequests() {
    Spark.get("/api/config", this::processConfigRequest);
    // Spark.get("/apt/distance", this::processDistanceRequest);
  }

  private String processConfigRequest(Request request, Response response) {
    setupResponse(request, response);
    try {
      Gson jsonConverter = new Gson();
      RequestConfig config = new RequestConfig();
      config.buildResponse();
      String responseBody = jsonConverter.toJson(config);
      log.trace("Config response: {}", responseBody);
      return responseBody;
    } catch (Exception e) {
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
  }

  private String processDistanceRequest(Request request, Response response) {
    // return processDataRequest(RequestDistance.class, request, response);
    return "This line should be replaced with the line above.";
  }

  private String processDataRequest(Type type, Request request, Response response) {
    setupResponse(request, response);
    try {
      Gson jsonConverter = new Gson();
      JSONValidator.validate(type, request.body());
      RequestHeader data = jsonConverter.fromJson(request.body(), type);
      data.buildResponse();
      String responseBody = jsonConverter.toJson(data);
      log.trace("Data Response: {}", responseBody);
      return responseBody;
    } catch (IOException e) {
      log.error("Data request failed validation: {}", request.body());
      log.error("Reason for failure: {}", e.getMessage());
      response.status(400);
      return null;
    } catch (Exception e) {
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
  }

  private void setupResponse(Request request, Response response) {
    logRequest(request);
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
  }

  private void logRequest(Request request) {
    String message = "Request - "
            + "[" + dateTimeFormat.format(LocalDateTime.now()) + "] "
            + request.ip() + " "
            + "\"" + request.requestMethod() + " "
            + request.pathInfo() + " "
            + request.protocol() + "\" "
            + "[" + request.body() + "]";
    log.error(message);
  }
}

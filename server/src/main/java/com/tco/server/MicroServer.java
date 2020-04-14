package com.tco.server;

import com.tco.misc.BadRequestException;
import com.tco.misc.JSONValidator;
import com.tco.requests.RequestConfig;
import com.tco.requests.RequestHeader;

import static spark.Spark.secure;

import com.google.gson.Gson;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Spark;

class MicroServer {

  private final String CONFIG_REQUEST_BODY = "{\"requestType\" : \"config\", \"requestVersion\" : 1}";
  private final Logger log = LoggerFactory.getLogger(MicroServer.class);
  private DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

  private final int HTTP_OK = 200;
  private final int HTTP_BAD_REQUEST = 400;
  private final int HTTP_SERVER_ERROR = 500;

  private final String API_PATH = "/api/";
  private final String API_CONFIG = API_PATH + "config";

  MicroServer(int serverPort) {
    configureServer(serverPort);
    serveStaticPages();
    processRestfulAPIrequests();
    log.info("MicroServer running on port: {}", serverPort);
  }

  /* Configure MicroServices here. */

  private void processRestfulAPIrequests() {
    Spark.get(API_CONFIG, this::processGetConfigRequest);
    Spark.post(API_CONFIG, this::processPostConfigRequest);
  }

  private String processGetConfigRequest(Request request, Response response) {
    return processHttpRequest(request, response, RequestConfig.class);
  }

  private String processPostConfigRequest(Request request, Response response) {
    return processHttpRequest(request, response, RequestConfig.class);
  }

  /* You shouldn't need to change what is found below. */

  private String processHttpRequest(Request httpRequest, Response httpResponse, Type type) {
    logRequest(httpRequest);
    setupResponse(httpResponse);
    String jsonString = getHttpRequestBody(httpRequest);
    try {
      JSONValidator.validate(jsonString, type);
      return buildJSONResponse(new Gson().fromJson(jsonString, type));
    } catch (IOException | BadRequestException e) {
      log.info("Bad Request - {}", e.getMessage());
      httpResponse.status(HTTP_BAD_REQUEST);
    } catch (Exception e) {
      log.info("Server Error - ", e);
      httpResponse.status(HTTP_SERVER_ERROR);
    }
    return jsonString;
  }

  private String getHttpRequestBody(Request request) {
    if (request.requestMethod().equals("GET") && request.pathInfo().equals(API_CONFIG)) {
      return CONFIG_REQUEST_BODY;
    } else {
      return request.body();
    }
  }

  private void setupResponse(Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
  }

  private String buildJSONResponse(RequestHeader request) throws BadRequestException {
    request.buildResponse();
    String responseBody = new Gson().toJson(request);
    log.trace("Response - {}", responseBody);
    return responseBody;
  }

  private void logRequest(Request request) {
    String message = "Request - "
            + "[" + dateTimeFormat.format(LocalDateTime.now()) + "] "
            + request.ip() + " "
            + "\"" + request.requestMethod() + " "
            + request.pathInfo() + " "
            + request.protocol() + "\" "
            + "[" + request.body() + "]";
    log.info(message);
  }

  private void configureServer(int serverPort) {
    Spark.port(serverPort);
    String keystoreFile = System.getenv("KEYSTORE_FILE");
    String keystorePassword = System.getenv("KEYSTORE_PASSWORD");
    if (keystoreFile != null && keystorePassword != null) {
      secure(keystoreFile, keystorePassword, null, null);
      log.info("MicroServer using HTTPS.");
    } else {
      log.info("MicroServer using HTTP.");
    }
  }

  private void serveStaticPages() {
    String path = "/public/";
    Spark.staticFileLocation(path);
    Spark.get("/", (req, res) -> {
      res.redirect("index.html");
      return null;
    });
  }
}

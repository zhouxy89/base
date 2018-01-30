package com.tripco.t00.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t00.server.HTTP;
import spark.Request;

public class Plan {
  private Trip trip;

  public Plan (Request request) {
    // first print the request
    System.out.println(HTTP.echoRequest(request));

    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    this.trip = gson.fromJson(requestBody, Trip.class);

    // each property of the json can now be read as a normal java class
    System.out.println(trip.title);
  }

  public Trip getTrip () {
    return trip;
  }
}

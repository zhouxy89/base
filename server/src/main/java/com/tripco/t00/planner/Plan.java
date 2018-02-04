package com.tripco.t00.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t00.server.HTTP;
import spark.Request;

import java.util.ArrayList;

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
    trip = gson.fromJson(requestBody, Trip.class);

    // Lots of computation here. We hardcoded the map and distances to get you started
    trip.map = trip.svg();
    trip.distances = new ArrayList<Integer>();
    trip.distances.add(12);
    trip.distances.add(23);
    trip.distances.add(34);
    trip.distances.add(45);
    trip.distances.add(65);
    trip.distances.add(19);


    // each property of the json can now be read as a normal java class
    System.out.println(trip.title);
  }

  public String getTrip () {
    Gson gson = new Gson();
    return gson.toJson(trip);
  }
}

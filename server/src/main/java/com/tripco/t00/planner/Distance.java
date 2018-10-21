package com.tripco.t00.planner;

import com.google.gson.Gson;

import java.util.Map;

public class Distance extends TFFIResponse {
  private Map origin;
  private Map destination;
  private String units;
  private int distance;

  private Distance() {
    type = "distance";
  }

  public Distance(short version, Map origin, Map dest, String units) {
    this();
    this.version = version;
    this.origin = origin;
    this.destination = dest;
    this.units = units;
  }

  /**
   * Calculate the distance between two points given by the JSON object.
   *
   * @return the distance in <units>
   */
  private int calculateDistance() {
    return 0;
  }

  public int getDistance() {
    return distance;
  }

  public static String buildResponse(String data) {
    Gson gson = new Gson();
    Distance obj = gson.fromJson(data, Distance.class);
    obj.distance = obj.calculateDistance();

    return gson.toJson(obj);
  }
}

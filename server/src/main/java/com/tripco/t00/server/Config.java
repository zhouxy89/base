package com.tripco.t00.server;

import com.google.gson.Gson;
import com.tripco.t00.planner.TFFIResponse;

import java.util.Arrays;
import java.util.List;

public class Config extends TFFIResponse {
  private List<String> units = Arrays.asList("miles", "kilometers", "nautical miles");

  private Config() {
    type = "config";
  }

  public static String buildResponse() {
    Config conf = new Config();
    Gson gson = new Gson();

    return gson.toJson(conf);
  }
}

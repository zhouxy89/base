package com.tripco.t00.planner;

public class Place {
  private String id;
  private String name;
  private String latitude;
  private String longitude;

  Place(String id, String name, String latitude, String longitude){
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

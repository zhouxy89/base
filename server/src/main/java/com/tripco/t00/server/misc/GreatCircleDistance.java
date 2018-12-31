package com.tripco.t00.server.misc;

import java.lang.Math;

/** Determines the distance between geographic coordinates.
 */
public class GreatCircleDistance {
  private double earthRadius;

  public GreatCircleDistance(double earthRadius) {
    this.earthRadius = earthRadius;
  }

  public long distanceBetween(double originLatitude,
                         double originLongitude,
                         double destinationLatitude,
                         double destinationLongitude) {
    // @todo complete this routine
    double deltaLatitude = originLatitude - destinationLatitude;
    double deltaLongitude = originLongitude - destinationLongitude;
    return (long) Math.round(Math.sqrt(deltaLatitude*deltaLatitude + deltaLongitude*deltaLongitude));
  }
}

package com.tripco.t00.server.misc;

/** Determines the distance between geographic coordinates.
 */
public class GreatCircleDistance {
  private double earthRadius;

  GreatCircleDistance(double earthRadius) {
    this.earthRadius = earthRadius;
  }

  public long distanceBetween(double originLatitude,
                         double originLongitude,
                         double destinationLatitude,
                         double destinationLongitude) {
    // @todo complete this routine
    return 0;
  }
}

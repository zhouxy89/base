package com.tripco.t00.TIP;

import com.tripco.t00.server.misc.GreatCircleDistance;
import java.util.Map;


/** Defines the TIP distance object.
 *
 * For use with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to determine the distance.
 * The MicroServer constructs the response JSON from the object using GSON.
 *
 * For unit testing purposes,
 * An object is created using the constructor below with appropriate parameters.
 * The buildResponse method is called to determine the distance.
 * The getDistance method is called to obtain the distance value for comparisons.
 *
 */
public class TIPDistance extends TIPHeader {
  private Map origin;
  private Map destination;
  private Double earthRadius;
  private long distance;


  TIPDistance(int version, Map origin, Map destination, Double earthRadius) {
    this();
    this.requestVersion = version;
    this.origin = origin;
    this.destination = destination;
    this.earthRadius = earthRadius;
    this.distance = 0;
  }


  private TIPDistance() {
    this.requestType = "distance";
  }


  public void buildResponse() {

    GreatCircleDistance gcd = new GreatCircleDistance(earthRadius);
    this.distance = gcd.distanceBetween(
        Double.parseDouble((String) this.origin.get("latitude")),
        Double.parseDouble((String) this.origin.get("longitude")),
        Double.parseDouble((String) this.destination.get("latitude")),
        Double.parseDouble((String) this.destination.get("longitude"))
    );
  }


  long getDistance() {
    return distance;
  }

  // @todo Sprint 1, compute the Great Circle Distance between the origin and destination.
  // @todo BASE need to change page, remove GSON handling.  Eliminate buildResponse parameter/return values.
  // @todo BASE change int to Integer,long,Long, or Double to double,float,Float or let students figure it out?
}

package com.tripco.t00.planner;

import com.tripco.t00.planner.TFFIResponse;

import java.util.Arrays;
import java.util.List;

/** Defines the TIP config object.
 *  
 * For use with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *  
 * For unit testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.

 */
public class
Config extends TFFIResponse {

  /* Server configuration elements */
  private String name;
  private List<String> attributes;

  /**  Create a config object for testing purposes.
   */
  public Config() {
    this.type = "config";
    this.version = 1;
  }

  /** Return name configuration.
   * 
   * @return
   */
  String getName() {
    return this.name;
  }

  /** Return attribute configuration.
   * 
   * @return
   */
  List<String> getAttributes() {
    return this.attributes;
  }

  /** Sets the server configuration information.
   */
  public String buildResponse() {
    this.name = "t00 Double Aughts";
    this.attributes = Arrays.asList("latitude", "longitude", "name");
    return "";
  }
  
  /*
   * @todo future sprints, update configuration features as TIP changes.
   */
}

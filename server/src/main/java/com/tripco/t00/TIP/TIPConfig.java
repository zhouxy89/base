package com.tripco.t00.TIP;

import java.util.Arrays;
import java.util.List;

/** This class defines the Config response that provides the client
 * with server specific configuration information.
 *  
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *  
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class TIPConfig extends TIPHeader {
  private String serverName;
  private List<String> placeAttributes;


  public TIPConfig() {
    this.type = "config";
    this.version = 1;
  }


  public String buildResponse() {
    this.serverName = "t##...";
    this.placeAttributes = Arrays.asList("latitude", "longitude", "serverName");
    return "";
  }


  String getServerName() {
    return this.serverName;
  }


  List<String> getPlaceAttributes() {
    return this.placeAttributes;
  }

}

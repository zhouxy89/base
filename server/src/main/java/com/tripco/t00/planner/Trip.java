package com.tripco.t00.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t00.server.HTTP;
import spark.Request;
import java.util.ArrayList;

/** Sample data in an object structure that converts nicely to a Json to return to the client.
 *
 */
public class Trip {

  private String title = "";
  private Option options = null;
  private ArrayList<Place> destinations = null;
  private ArrayList<Integer> distances = null;
  private String map = "";

  /** The constructor create the plan from the request data.
   *
   * For now we just hardcoded some test data.
   *
   * @param request the com.tripco.t00.server.HTTP request containing the information for the plan.
   */
  public Trip(Request request) {
    // first print the request
    System.out.println(HTTP.echoRequest(request));

    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    Trip requestedTrip = gson.fromJson(requestBody, Trip.class);

    // each property of the json can now be read as a normal java class
    // System.out.println(requestedTrip.title);

    // now do lots of computation.  this is left up to you.

    // then construct the objects containing the response
    title = "Around the world!";

    this.options = new Option("miles");

    destinations = new ArrayList<Place>();
    destinations.add( new Place("dnvr","Denver", "", ""));
    destinations.add( new Place("bldr","Boulder", "", ""));
    destinations.add( new Place("foco","Fort Collins", "", ""));
    destinations.add( new Place("grly","Greeley", "", ""));
    destinations.add( new Place("fomo","Fort Morgan", "", ""));
    destinations.add( new Place("frst","Firestone", "", ""));

    distances = new ArrayList<Integer>();
    distances.add(12);
    distances.add(23);
    distances.add(34);
    distances.add(45);
    distances.add(65);
    distances.add(19);

    map = svg();
  }

  private String svg() {
    return "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"#77cc77\" stroke=\"#000000\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";
  }
}
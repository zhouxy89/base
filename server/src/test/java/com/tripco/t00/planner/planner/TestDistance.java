package com.tripco.t00.planner.planner;

import com.google.gson.Gson;
import com.tripco.t00.planner.Distance;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestDistance {
  Gson gson = new Gson();
  private Distance testObj;

  @Before
  public void setup() {
    Map<String, Object> origin = new HashMap<>();
    origin.put("latitude", 40.5853);
    origin.put("longitude", -105.0844);
    origin.put("name", "Fort Collins, Colorado, USA");
    Map<String, Object> dest = new HashMap<>();
    dest.put("latitude", 40.5853);
    dest.put("longitude", -105.0844);
    dest.put("name", "Fort Collins, Colorado, USA");

    testObj = new Distance((short)1, origin, dest, "miles");
  }

  @Test
  public void testDistance() {
    Gson gson = new Gson();
    Distance output = gson.fromJson(Distance.buildResponse(gson.toJson(testObj)), Distance.class);

    assertEquals(0, output.getDistance());
  }

}

package com.tripco.t00.TIP;

import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP distance class and its buildResponse method.
 */
public class TestTIPDistance {

  /* Radius and location values shared by test cases */
  private final Double radiusMiles = 3958.7603;
  private Map<String, Object> csu;
  private final int version = 1;

  @Before
  public void createLocationsForTestCases() {
    csu = new HashMap<>();
    csu.put("latitude", "40.576179");
    csu.put("longitude", "-105.080773");
    csu.put("name", "Oval, Colorado State University, Fort Collins, Colorado, USA");
  }

  @Test
  public void testOriginDestinationSame() {
    TIPDistance trip = new TIPDistance(version, csu, csu, radiusMiles);
    trip.buildResponse();
    long expect = 0;
    long actual = trip.getDistance();
    assertEquals("origin and destination are the same", expect, actual);
  }

  /* @todo Sprint 1 create additional test case methods
   * @todo Base nuke the short!
   * @todo Base longs in test cases?  worksheet/activity on precision used in course.
   * @todo Base radius as double (8 digits) or integer (4 digits - 3959)?
   * @todo Base build a worksheet so the team can figure out additional tests (radius,locations) during class.
   */

}

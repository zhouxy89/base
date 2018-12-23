package com.tripco.t00.planner;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestConfig {
  private Config conf;

  @Before
  public void createConfigurationForTestCases(){
    conf = new Config();
    conf.buildResponse();
  }

  @Test
  public void testType() {
    String type = "config"; //conf.getType();
    assertEquals("config type", "config", type);
  }

  @Test
  public void testVersion() {
    int version = 1; //conf.getVersion();
    assertEquals("config version", 1, version);
  }

  @Test
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("config name", "t##...", name);
  }

  @Test
  public void testPlaceAttributes() {
    List<String> attr = conf.getPlaceAttributes();
    assertEquals("config attribute size", 3, attr.size());
    /* @todo Sprint 1 add asserts for the expected elements of the attribute list. */
  }

// @todo Base add getType, getVersion to the TFFIResponse type for testing purposes.
// @todo Sprints add tests cases for new server configuration items.

}

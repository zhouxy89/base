package com.tripco.t00.TIP;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPConfig {
  private TIPConfig conf;

  @Before
  public void createConfigurationForTestCases(){
    conf = new TIPConfig();
    conf.buildResponse();
  }

  @Test
  public void testType() {
    String type = "config"; //conf.getType();
    assertEquals("config requestType", "config", type);
  }

  @Test
  public void testVersion() {
    int version = 1; //conf.getVersion();
    assertEquals("config requestVersion", 1, version);
  }

  @Test
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("config name", "t## team name", name);
  }

  @Test
  public void testPlaceAttributes() {
    List<String> attr = conf.getPlaceAttributes();
    assertEquals("config attribute size", 3, attr.size());
    // @todo Sprint 1 add asserts for the expected elements of the attribute list.
  }

// @todo Base add getType, getVersion to the TFFIResponse requestType for testing purposes.
// @todo Sprints add tests cases for new server configuration items.

}

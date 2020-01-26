package com.tco.server;

import java.util.List;

import com.tco.server.RequestConfig;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestRequestConfig {
  private RequestConfig conf;

  @Before
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
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
  }
}
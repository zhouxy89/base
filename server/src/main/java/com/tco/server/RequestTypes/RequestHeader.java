package com.tco.server.RequestTypes;

public abstract class RequestHeader {

  protected final static int CURRENT_SUPPORTED_VERSION = 1;

  protected String requestType;
  protected Integer requestVersion;

  public String getRequestType() {
    return requestType;
  }

  public Integer getRequestVersion() {
    return requestVersion;
  }

  public abstract void buildResponse();
}

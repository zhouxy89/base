package com.tco.server;

public abstract class RequestHeader {
  protected Integer requestVersion;
  protected String requestType;

  public abstract void buildResponse();
}
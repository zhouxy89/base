package com.tripco.t00.misc;

import com.tripco.t00.TIP.TIPConfig;
import com.tripco.t00.TIP.TIPDistance;
import com.tripco.t00.TIP.TIPHeader;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InvalidClassException;
import java.lang.reflect.Type;
import java.nio.file.Path;
import org.everit.json.schema.SchemaException;
import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.everit.json.schema.ValidationException;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Validates a JSON object using a predefined schema in /resources.
 */
public class JSONValidator {

  private Schema schema;

  public JSONValidator(Type requestType) throws InvalidClassException {
    this.schema = getSchemaFromType(requestType);
  }

  private Schema getSchemaFromType(Type requestType) throws InvalidClassException {
    String resourcePath = "";

    switch (requestType.getTypeName()) {
      case "TIPDistance": resourcePath = "/TIPDistanceRequestSchema.json"; break;
      default: throw new InvalidClassException(String.format("Schema resource not found for %s!", requestType.getTypeName()));
    }


    return null;
  }

}

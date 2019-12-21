package com.tripco.t00.misc;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
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

  private final Logger log = LoggerFactory.getLogger(JSONValidator.class);

  private Schema schema;

  public JSONValidator(Type requestType) {
    this.schema = getSchemaFromType(requestType);
  }

  private Schema getSchemaFromType(Type requestType) {
    String resourcePath = "";

    switch (requestType.getTypeName()) {
      case "com.tripco.t00.TIP.TIPDistance":
        resourcePath = "/schemas/TIPDistance.json"; break;
      default:
        log.info("Unknown class {} specified for schema validation", requestType.getTypeName());
        return null;
    }

    Schema loadedSchema = null;
    try (InputStream inputStream = getClass().getResourceAsStream(resourcePath)) {
      JSONObject rawSchema = new JSONObject(new JSONTokener(inputStream));
      loadedSchema = SchemaLoader.load(rawSchema);
    } catch (SchemaException | JSONException | ValidationException | IOException e) {
      log.error("Unable to create schema. Root message: {}", e.getMessage());
      e.printStackTrace();
    }

    return loadedSchema;
  }

  // Validates the JSON request against the schema instance.
  public boolean isValid(String requestBody) {
    if (this.schema != null) {
      try {
        JSONObject request = new JSONObject(requestBody);
        this.schema.validate(request);
      } catch (ValidationException e) {
        log.error("Invalid request {}", requestBody);
        e.printStackTrace();
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }

  @Override
  public String toString() {
    return "JSONValidator{" +
        "schema=" + schema +
        '}';
  }
}

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

  public JSONValidator(Type requestType) throws IOException {
    this.schema = getSchema(requestType.getTypeName());
  }

  // Returns the schema matching the TIP class name, i.e. "/schemas/TIPDistance.json".
  private Schema getSchema(String className) throws IOException {
    String schemaPath = String.format("/schemas/%s.json",
        className.substring(className.lastIndexOf(".") + 1));

    try (InputStream inputStream = getClass().getResourceAsStream(schemaPath)) {
      JSONObject rawSchema = new JSONObject(new JSONTokener(inputStream));
      return SchemaLoader.load(rawSchema);
    } catch (NullPointerException e) {
      throw new IOException(String.format("No schema %s exists for type %s", schemaPath, className));
    } catch (SchemaException | JSONException e) {
      throw new IOException(String.format("Invalid schema format. Root message: %s", e.getMessage()));
    }
  }

  // Validates the JSON request against the schema instance.
  public void validate(String requestBody) throws IOException {
    try {
      JSONObject request = new JSONObject(requestBody);
      this.schema.validate(request);
    } catch (ValidationException e) {
      throw new IOException(e.getMessage());
    }

  }

  @Override
  public String toString() {
    return "JSONValidator{" +
        "schema=" + schema +
        '}';
  }
}

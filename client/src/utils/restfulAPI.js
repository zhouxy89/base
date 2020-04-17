const axios = require('axios');

export async function sendServerRequest(requestBody, serverPort=getOriginalServerPort()) {
  try { return await axios.post(`${serverPort}/api/${requestBody.requestType}`, JSON.stringify(requestBody)) }
  catch(error) { return null; }
}

export function getOriginalServerPort() {
  const serverProtocol = location.protocol;
  const serverHost = location.hostname;
  const serverPort = location.port;
  const alternatePort = process.env.SERVER_PORT;
  return `${serverProtocol}\/\/${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}

export function isJsonResponseValid(object, schema) {
  let Ajv = require('ajv');
  let anotherJsonValidator = new Ajv();
  let validate = anotherJsonValidator.compile(schema);
  return validate(object);
}
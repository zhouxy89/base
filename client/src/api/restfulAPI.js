
/* functions to support server interactions via restful APIs.
 */

export function sendServerRequest(
    requestType, serverPort=getOriginalServerPort()) {
  const restfulAPI = `http://${serverPort}/api/${requestType}`;
  const requestOptions = {
    method: "GET"};
  return processRestfulAPI(restfulAPI, requestOptions);
}


export function sendServerRequestWithBody(
    requestType, requestBody, serverPort=getOriginalServerPort()) {
  const restfulAPI = `http://${serverPort}/api/${requestType}`;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(requestBody)};
  return processRestfulAPI(restfulAPI, requestOptions);
}


async function processRestfulAPI(restfulAPI, requestOptions) {
  try {
    let response = await fetch(restfulAPI, requestOptions);
    return {
      statusCode: response.status,
      statusText: response.statusText,
      body: await response.json()
    };
  }
  catch(err) {
    console.error(err);
    return { statusCode: 0, statusText: 'Client failure', body: null };
  }
}


export function getOriginalServerPort() {
  const serverHost = location.hostname;
  const serverPort = location.port;
  const alternatePort = process.env.dev;
  return `${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}


//@todo handle status codes 200,400,500?
//@todo serialize/timeout async requests to prevent multiple clicks
//@todo should we only use post reqeuests to simplify? for consistency?

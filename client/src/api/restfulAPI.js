
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
  return fetch(restfulAPI, requestOptions)
  .then(response => {return response.json()})
  .catch(err => {console.error(err)});
}


export function getOriginalServerPort() {
  const serverHost = location.hostname;
  const serverPort = location.port;
  const alternatePort = process.env.dev;
  return `${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
  //return serverHost.concat(':').concat((!alternatePort) ? serverPort : alternatePort);
}


//@todo handle status codes 200,400,500?
//@todo should we only use post reqeuests to simplify? for consistency?

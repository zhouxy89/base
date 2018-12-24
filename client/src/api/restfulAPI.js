
export async function sendHttpGetRequest(type, serverPort=getOriginalServerPort()) {
    const restfulAPI = 'http://' + serverPort + '/api/' + type;
    const requestOptions = {method: "GET"};
    return fetch(restfulAPI, requestOptions).then(response => {return response.json()}).catch(err => {console.error(err)});
}


export async function sendHttpPostRequest(body, type, serverPort=getOriginalServerPort()) {
    const restfulAPI = 'http://' + serverPort + '/api/' + type;
    const requestOptions = {method: "POST", body: JSON.stringify(body)};
    return fetch(restfulAPI, requestOptions).then(response => {return response.json()}).catch(err => {console.error(err)});
}

export function getOriginalServerPort() {
    const serverHost = location.hostname;
    const serverPort = location.port;
    const alternatePort = process.env.dev;
    return serverHost.concat(':').concat((!alternatePort) ? serverPort : alternatePort)
}

//@todo BASE extract the fetch/json/catch to a separate function
//@todo handle status codes 200,400,500

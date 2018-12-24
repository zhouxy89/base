export function getOriginalServerPort() {
    const serverHost = location.hostname;
    const serverPort = location.port;
    const alternatePort = process.env.dev;
    return serverHost.concat(':').concat((!process.env.dev) ? serverPort : process.env.dev)
}


export async function sendHttpGetRequest(type, serverPort=getOriginalServerPort()) {
    const restfulAPI = 'http://' + serverPort + '/api/' + type;
    const options = {method: "GET"};
    return fetch(restfulAPI, options).then(response => {return response.json()}).catch(err => {console.error(err)});
}


export async function sendHttpPostRequest(body, type, serverPort=getOriginalServerPort()) {
    const restfulAPI = 'http://' + serverPort + '/api/' + type;
    const options = {method: "POST", body: JSON.stringify(body)};
    return fetch(restfulAPI, options).then(response => {return response.json()}).catch(err => {console.error(err)});
}

//@todo BASE extract the fetch/json/catch to a separate function
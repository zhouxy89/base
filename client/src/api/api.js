function get_hostname() {
  return location.hostname.concat(':').concat((!process.env.dev) ?
    location.port :
    process.env.dev)
}

export async function request(body, type, hostname=get_hostname()) {
  return fetch('http://' + hostname + '/api/' + type, {
    method:"POST",
    body: JSON.stringify(body)
  }).then(response => {return response.json()}).catch(err => {console.error(err)});
}

export async function get_config(hostname=get_hostname()) {
  return fetch('http://' + hostname + '/api/config', {
    method:"GET"
  }).then(response => {return response.json()}).catch(err => {console.error(err)});
}
  function fetchResponse(body){
    const host = location.hostname + ':' + ((!process.env.dev) ? location.port : process.env.dev);
    return fetch('http://' + host + '/plan', {
      method:"POST",
      body: JSON.stringify(body)
    });
  }

  export async function plan(trip){
    try {
      let serverResponse = await fetchResponse(trip);
      let response = serverResponse.json();
      return response;
    } catch(err) {
      console.error(err);
    }
  }

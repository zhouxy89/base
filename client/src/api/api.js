export async function request(body, type,
    port = (!process.env.dev) ?
      location.port :
      process.env.dev
  ){
  try {
    const response = await fetch('http://' + location.hostname + ":" + port + '/' + type, {
      method:"POST",
      body: JSON.stringify(body)
    });
    return response.json();
  } catch(err) {
    console.error(err);
  }
}

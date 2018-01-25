const path = require('path')
const express = require('express')

// Set up the express application
const app = express()
// Mount the local public folder to the one on the client
const pathBundle = express.static(
                    path.join(__dirname, 'public')
                   )
app.use('/public', pathBundle)

// Return the index page to the client
// Since this is a single page web app, index.html is the only html page
const pathIndex = path.join(__dirname, 'index.html')
app.get('/', function (req, res) {
  // Pass the html to the client
  res.sendFile(pathIndex)
});

app.listen(8080);
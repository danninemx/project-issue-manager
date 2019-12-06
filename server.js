const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');

/*
//-----------------//
// Dotenv testing  //
//-----------------//
require('dotenv').config();
console.log("\n Environment variables :", process.env);

// let API_Key = process.env.Firebase_apiKey;
let API_Key = process.env.API_KEY;
console.log("\n API_Key : ", API_Key);
*/

//-----------------//
// Socket.io setup //
//-----------------//
// const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT, () =>
  console.log(`🌎  ==> Socket.io initialized API Server to now listen on PORT ${PORT}!`)
);

// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/client/public/index.html');
});

io.on('connection', function (socket) {
  /*
  Implement alert/messaging here
  */

});

//------------------------//
// End of Socket.io setup //
//------------------------//


// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());
// per https://www.positronx.io/react-axios-tutorial-make-http-get-post-requests/
app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);


// parse application/json

app.use(function (req, res) {
  // res.setHeader('Content-Type', 'text/plain') // testing to see if this is why manifest.json is being read as text
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})


// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/issuemanager",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Express starts the API server
// app.listen(PORT, () =>
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
// );

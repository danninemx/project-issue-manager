const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


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
  // socket.emit('signon', 'Welcome to Bookgle');

  // socket.broadcast.emit('user just connected');

  // socket.on('connect', function (data) {
  //   console.log(data);
  // });

  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

  // socket.emit('news', { hello: 'world1' });


});

//------------------------//
// End of Socket.io setup //
//------------------------//


// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);



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

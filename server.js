// Your server.js file should require the basic npm packages we've used in class: express and path.
var express = require("express");
var path = require("path");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Create express app instance.
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// These routes give our server a map for responding to users
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
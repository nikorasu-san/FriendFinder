// Dependencies
var express = require("express");
var path = require('path')

var app = express();

// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(express.static(path.join(__dirname, '/public')));

// run route functions
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Starts the server to begin listening (Always put after code)
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("http://localhost:" + PORT);
});
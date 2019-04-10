// linking npm dependencies
var path = require("path");
var express = require("express");


module.exports = function (app) {
    // defining path to static files
    app.use(express.static(path.join(__dirname, '../public')));

    // send survey page to browser
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // send friend finder page to browser
    app.get("/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/friends.html"));
    });

    // send user the home page
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


}
var path = require("path");
var express = require("express");

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

module.exports = function (app) {

    app.use(express.static(path.join(__dirname, '../public')));

    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/result.html"));
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


}
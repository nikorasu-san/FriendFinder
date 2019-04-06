var path = require("path");


// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

module.exports = function (app) {


    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
        // res.sendFile(path.join(__dirname, "../public/assets/css/style.css"))
        // res.sendFile(path.join(__dirname, "../public/assets/javascript/javascript.js"))

    });



    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


}
var mysql = require("mysql");
const secret = require("../keys")


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: secret.password.sql,
    database: "tvfriendfinder"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;

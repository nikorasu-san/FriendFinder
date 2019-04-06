//const orm = require("../../config/orm")
const connection = require("../../config/connection")

module.exports = function (app) {


    app.get("/api/shows", function (req, res) {
        connection.query("SELECT * FROM ??;", "shows", function (err, data) {
            if (err) throw err;
            //console.log(data)
            res.json(data);
        })
    });

    app.get("/api/users", function (req, res) {
        connection.query("SELECT * FROM users;", function (err, data) {
            if (err) throw err;
            //console.log(data)
            res.json(data);
        })
    })


    app.post("/api/users", function (req, res) {
        var userData = req.body
        console.log(userData)
        // compare user score with tv shows
        connection.query("SELECT show_name, score FROM shows;", function (err, shows) {
            if (err) throw err;
            // console.log(shows)
            const bestMatch = {
                show_name: '',
                scoreDifference: 100,
                userMatch: []
                // photo: 'url',
                // friendDifference: Infinity
            }
            findShowMatch(shows, bestMatch, userData, res)
            // for (let i = 0; i < shows.length; i++) {
            //     totalDifference = 0;
            //     currentShow = shows[i]
            //     currentScore = currentShow.score.split(",")
            //     for (let j = 0; j < currentScore.length; j++) {
            //         totalDifference += Math.abs(parseInt(userData.score[j] - currentScore[j]))
            //         console.log(currentShow.show_name, totalDifference)
            //     }
            //     if (totalDifference < bestMatch.scoreDifference) {
            //         bestMatch.show_name = currentShow.show_name;
            //         bestMatch.scoreDifference = totalDifference
            //         totalDifference = 0;
            //     } else {
            //         totalDifference = 0
            //     }

            // }
            // console.log("best:", bestMatch)

            // find others that matched this show
            // connection.query("")


        })


        // });

    })
}


function findShowMatch(shows, bestMatch, userData, res) {
    for (let i = 0; i < shows.length; i++) {
        totalDifference = 0;
        currentShow = shows[i]
        currentScore = currentShow.score.split(",")
        for (let j = 0; j < currentScore.length; j++) {
            totalDifference += Math.abs(parseInt(userData.score[j] - currentScore[j]))
            // console.log(currentShow.show_name, totalDifference)
        }
        if (totalDifference < bestMatch.scoreDifference) {
            // add the winning show name to bestMatch JSON to go to site and userData JSON to go to database
            bestMatch.show_name = currentShow.show_name;
            userData.shown_name = currentShow.show_name;
            bestMatch.scoreDifference = totalDifference
        } else {
            // do nothing
        }

    }
    findUserMatch(bestMatch, userData, res);

}

function findUserMatch(bestMatch, userData, res) {
    // query users with matching show.
    connection.query("SELECT user_name FROM users WHERE show_name = ?;", [bestMatch.show_name], function (err, friends) {
        if (err) throw err;
        console.log(friends)
        // loop through friend and push friends
        for (let k = 0; k < friends.length; k++) {
            bestMatch.userMatch.push(friends[k].user_name);
        }
        console.log("best:", bestMatch);
        // -- uncomment later function to add user to database
        // adduser(userData)
        console.log("user:", userData);
        res.json(bestMatch)
    })
}

function addUser(userData) {
    // insert query
    connection.query("INSERT INTO users (user_name,photo,score,show_name) VALUES (?,?,?,?);", [userData.name, userData.photo, userData.score, userData.show_name], function (err, data) {
        if (err) throw err;
        console.log(data)
    })
}
//const orm = require("../../config/orm")
const connection = require("../../config/connection")
const axios = require('axios')
const omdb = require("../../keys")

module.exports = function (app) {

    // GET method to reveal database data on possible show matches 
    app.get("/api/shows", function (req, res) {
        console.log(omdb.api.key)
        connection.query("SELECT * FROM ??;", "shows", function (err, data) {
            if (err) throw err;
            //console.log(data)
            res.json(data);
        })
    });

    // GET method to reveal database data on past users that can be matched
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
            // create bestMatch object that will eventually respond to front end
            const bestMatch = {
                show_name: '',
                scoreDifference: 100,
                userMatch: [],
                userMatchPhoto: []
            }
            // call function to start processing matched show
            findShowMatch(shows, bestMatch, userData, res)
        })

    })
}

// define function that compares user score to shows in database
function findShowMatch(shows, bestMatch, userData, res) {
    // loop through select query results for show names and show scores
    for (let i = 0; i < shows.length; i++) {
        // set a value to track comparison of userData to bestMatch
        let totalDifference = 0;
        let currentShow = shows[i]
        // turn the show scores into an array that can be looped
        let currentScore = currentShow.score.split(",")
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
    connection.query("SELECT user_name, photo FROM users WHERE show_name = ?;", [bestMatch.show_name], function (err, friends) {
        if (err) throw err;
        console.log(friends)
        // loop through matched users and push to working POST response object
        for (let k = 0; k < friends.length; k++) {
            bestMatch.userMatch.push(friends[k].user_name);
            bestMatch.userMatchPhoto.push(friends[k].photo);
        }
        console.log("best:", bestMatch);
        // ping OMDB for show information
        pingOMDB(bestMatch, userData, res)

    })
}

function pingOMDB(bestMatch, userData, res) {
    // set a regex and replace variable to manipulate show title into a format friendly to OMDB API
    let regex = /[- ]/g
    let apiSafeTitle = bestMatch.show_name.replace(regex, "+")
    let apiUrl = `http://www.omdbapi.com/?apikey=${omdb.api.key}&type=series&t=${apiSafeTitle}`;
    // resolve edge case with show options that won't appear correctly
    if (bestMatch.show_name === "CW Charmed") {
        apiUrl = `http://www.omdbapi.com/?apikey=${omdb.api.key}&type=series&t=Charmed&y=2018`;
    }
    // API call to OMDB
    axios.get(apiUrl).then(function (response) {
        // Log message if successful call has no data
        if (response.data.Response === 'False') {
            let message = "We couldn't find this show. Please troubleshoot API URL"
            console.log(message)
        } else {
            // When API has data, add show details to object pending POST response
            bestMatch.plot = response.data.Plot;
            bestMatch.genre = response.data.Genre;
            bestMatch.poster = response.data.Poster;
        }
        // call function to add user to database and pass data forward
        addUser(bestMatch, userData, res)
        // If there is an error from axios-OMDB, log error
    }).catch(function (error) {
        console.log(error)
    })
}


function addUser(bestMatch, userData, res) {
    // convert userData.score into a string to fit inside the database 
    userData.score = userData.score.join()
    console.log(userData.score)
    // insert query
    connection.query("INSERT INTO users (user_name,photo,score,show_name) VALUES (?,?,?,?);", [userData.name, userData.photo, userData.score, userData.show_name], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows)
        res.json(bestMatch)
    })
}
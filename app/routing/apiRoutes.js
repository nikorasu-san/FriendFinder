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
            console.log(shows)
            const bestMatch = {
                show_name: '',
                scoreDifference: 100
                // photo: 'url',
                // friendDifference: Infinity
            }
            for (let i = 0; i < shows.length; i++) {
                totalDifference = 0;
                currentShow = shows[i]
                currentScore = currentShow.score.split(",")
                for (let j = 0; j < currentScore.length; j++) {
                    totalDifference += Math.abs(parseInt(userData.score[j]) - parseInt(currentScore[j]))
                    console.log(currentShow.show_name, totalDifference)
                }
                if (totalDifference < bestMatch.scoreDifference) {
                    bestMatch.show_name = currentShow.show_name;
                    bestMatch.scoreDifference = totalDifference
                    totalDifference = 0;
                } else {
                    totalDifference = 0
                }

            }
            console.log("best:", bestMatch)



        })
        //     for (let i loop over the friends) {
        //         totalDifference = 0;
        //         currentFriend = friends[i]

        //         for (let j loop over currentFriend.scores){
        //             //compare the userData.scores[j] and currentFriend.scores[j]

        //             totalDifference += Math.abs(parseInt(user score) - parseInt(friend score))
        //         }

        // if (totalDifference <= bestMatch.friendDifference) {
        //             bestMatch = currentFriend
        //         }


        //     }

        // return bestMatch;
        // }

        // }


        res.json(true)

        // });

    })
}
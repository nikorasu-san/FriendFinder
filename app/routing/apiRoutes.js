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
        connection.query("SELECT * FROM ??;", "users", function (err, data) {
            if (err) throw err;
            //console.log(data)
            res.json(data);
        })
    })


    // app.post("", function (req, res) {
    //     compare users
    /*

       function findMatch(userData, friends) {
    const bestMatch = {
        name: '',
        photo: 'url',
        friendDifference: Infinity
    }

    for (let i loop over the friends) {
        totalDifference = 0;
        currentFriend = friends[i]

        for (let j loop over currentFriend.scores){
            //compare the userData.scores[j] and currentFriend.scores[j]

            totalDifference += Math.abs(parseInt(user score) - parseInt(friend score))
        }

if (totalDifference <= bestMatch.friendDifference) {
            bestMatch = currentFriend
        }

        
    }

return bestMatch;
}

}
*/

    //     res.json(true)

    // });

}
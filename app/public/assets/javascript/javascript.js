$(document).ready(function () {
    console.log("attached")

    // submit button event on survey.html
    $("#submit").on("click", function (event) {
        // prevent page refreshes
        event.preventDefault();
        // store the first character in the selected dropdown answers
        let q1 = $("#q1").find(":selected").text()[0]
        let q2 = $("#q2").find(":selected").text()[0]
        let q3 = $("#q3").find(":selected").text()[0]
        let q4 = $("#q4").find(":selected").text()[0]
        let q5 = $("#q5").find(":selected").text()[0]
        let q6 = $("#q6").find(":selected").text()[0]
        let q7 = $("#q7").find(":selected").text()[0]
        let q8 = $("#q8").find(":selected").text()[0]
        let q9 = $("#q9").find(":selected").text()[0]
        let q10 = $("#q10").find(":selected").text()[0]

        // define an object that POST request will send to back-end
        var newUser = {
            name: $("#name").val().trim(),
            photo: $("#photo").val().trim(),
            score: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]
        }
        // define regex variables for url validation logic
        let httpCheck = /http:/g
        let httpsCheck = /https:/g
        // check that a name was given
        if (newUser.name.trim() === "") {
            alert("Please enter a name");
            // if photo url field is blank or doesn't have http/https at index 0
        } else if (newUser.photo.trim() === "" || newUser.photo.search(httpCheck) !== 0 && newUser.photo.search(httpsCheck) !== 0) {
            alert("Please enter in a URL")
        } else {
            // validations passed, make a POST call to back-end
            $.post("/api/users", newUser).then(function (data) {
                // if there is a response from POST call
                if (data) {
                    // display data in results section 
                    // display matched show details
                    $("#result-body").html(`<h3>We recommend:<br> <span class="text-success">${data.show_name}<span><br><img src="${data.poster}"/><br><br>${data.plot}<br><br>Genre: ${data.genre}</h3>`)

                    // matched user details
                    let userSection = $("#result-body").append(`<h3>Others who matched with this show:</h3>`)
                    // parse out userMatch array
                    if (!data.userMatch.length) {
                        // if nothing is in array, let user
                        let user = $(`<h3 class="text-danger">No one has matched this show yet.</h3>`)
                        $(userSection).append(user)
                    } else {
                        // loop through array and perform information for each user
                        for (let i = 0; i < data.userMatch.length; i++) {
                            // display a hyperlinked user name that points to their photo
                            let user = $(`<h3 class="text-success"><a target="_blank" href="${data.userMatchPhoto[i]}">${data.userMatch[i]}</a></h3>`)
                            // append the user to the sub-header
                            $(userSection).append(user)
                        }
                    }
                    // push a button to toggle back to survey
                    $("#result-body").append(`<button class="btn btn-primary" id="show">Show Survey</button>`)


                    // hide survey, show results panel
                    $("#survey").attr("class", "hide")
                    $("#results").attr("class", "card border-dark mb-3 mt-4 top text-center")

                } else {
                    // if there is no POST response
                    console.log("Troubleshoot POST response from back-end.")
                }

            })
        }
    });

    // button click event on survey.html to toggle back to survey form
    $(document).on("click", "#show", function () {
        $("#survey").attr("class", "card border-dark mt-4 mb-3")
        $("#result-body").empty();
        $("#results").attr("class", "hide")
    });

    // Submit form event on result.html 
    $("#submit-show").on("click", function (event) {
        // prevent page refresh on click
        event.preventDefault();
        // clear result section
        $("#result-body").empty();

        // define JSON sent to back-end
        var searchData = {
            show: $("#show-name").find(":selected").text(),
            id: $("#show-name").find(":selected").data("showid")
        }

        // make POST call to back-end
        $.post("/friends", searchData).then(function (data) {
            // display a sub-header for the results
            let userSection = $("#result-body").append(`<h3>Others who should be watching this show:</h3>`)

            if (!data.fellowUserName.length) {
                // if userName array is empty, update the sub-header text to alert no-users found
                userSection = $("#result-body").html(`<h3 class="text-danger">No one has matched this show yet.</h3>`)
            } else {
                // loop through userName array
                for (let i = 0; i < data.fellowUserName.length; i++) {
                    // display the user name with a link to their photo under the results sub-header
                    let user = $(`<h3 class="text-success"><a target="_blank" href="${data.fellowPhoto[i]}">${data.fellowUserName[i]}</a></h3>`)
                    $(userSection).append(user)
                }
            }
        })
    });
});
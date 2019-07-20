// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results.

// This route will also be used to handle the compatibility logic.

// ===============================================================================
// links this route to the data source 'friends'

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // display the data in JSON format of all possible friends!
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Handling of incoming survey results

  app.post("/api/friends", function(req, res) {
    // adding new information to the friends database

    //OBJECT to hold the user's best match
    // the final result is determined after looping through all options
    var platonicMatch = {
        name: "",
        photo: "",
        friendDifference: Infinity
      };
  
      // user's survey is taken and parsed
      var userData = req.body;
      var userScores = userData.scores;
  
      // variable to calculate difference between user and other scores
      var totalDifference;
  
      // loop through the friend's database
      for (var i = 0; i < friends.length; i++) {
        var currentFriend = friends[i];
        totalDifference = 0;
  
        console.log(currentFriend.name);
  
        // iterate through all the different friend scores
        for (var j = 0; j < currentFriend.scores.length; j++) {
          var currentFriendScore = currentFriend.scores[j];
          var currentUserScore = userScores[j];
  
          // total difference/absolute value between the scores and sum them into the totalDifference
          totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
        }
  
        // If the sum of differences is less then the differences of the current "platonic match"
        if (totalDifference <= bestMatch.friendDifference) {
          // Reset the bestMatch to be the new friend.
          platonicMatch.name = currentFriend.name;
          platonicMatch.photo = currentFriend.photo;
          platonicMatch.friendDifference = totalDifference;
        }
      }
  
      // save the user's data to the database after check
      friends.push(userData);
  
      // Return the user's best match!
      res.json(platonicMatch);
    });
  };

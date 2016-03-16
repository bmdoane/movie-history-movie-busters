"use strict";

app.controller("FindCtrl", [
  "$scope",
  "MovieFactory",
  "$http",

  function($scope, MovieFactory, $http) {
    $scope.findTitle = "";
    $scope.movie = false;
    $scope.movieImdbID = "";

    // this function is triggered by find button
    $scope.find = function() {
    // takes findTitle string and returns search results from OMDB API
      MovieFactory($scope.findTitle).then(
      	movieCollection => {console.log(movieCollection)
      		$scope.movie = movieCollection;
          $scope.movieImdbId = $scope.movie.imdbID;
      	},
      	err => console.log(err)
      	);
    }


    $scope.add = function () {

      //take movie and add tracked id of true

      // POST the song to Firebase
      $http.post(
        "https://nss-team-america.firebaseio.com/movies.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          title: $scope.movie.Title,
          year: $scope.movie.Year,
          actors: $scope.movie.Actors,
          rating: "0",
          watched: false,
          tracked: true,
          imdbID: $scope.movie.imdbID
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => console.log("Added movie to firebase"),// Handle resolve
        (response) => console.log(response)  // Handle reject
      );


      $scope.movie = false;
      $scope.findTitle = "";

    };

    }


]);
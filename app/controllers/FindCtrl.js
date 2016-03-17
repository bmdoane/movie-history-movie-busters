"use strict";

app.controller("FindCtrl", [
  "$scope",
  "MovieFactory",
  "FirebaseFactory",
  "$http",

  function($scope, MovieFactory, FirebaseFactory, $http) {
    $scope.findTitle = "";
    $scope.movieList;

    // this function is triggered by find button
    $scope.find = function() {
    // takes findTitle string and returns search results from OMDB API

      $scope.movieList = [];

      MovieFactory($scope.findTitle).then(
      	movie => {console.log(movie)
      		// $scope.movie = movie;
          $scope.movieList.push(movie);
      	},
      	err => console.log(err)
      	);

    // takes findTitle string and returns search results from Firebase
      FirebaseFactory().then(
        movieCollection => {
          //allow for uppercase & lowercase matches
          let searchStr = $scope.findTitle.toLowerCase();

          console.log("movieCollection from FB", movieCollection);
          for (let key in movieCollection) {
            if (movieCollection[key].title.toLowerCase().indexOf(searchStr) > -1) {
              $scope.movieList.push(movieCollection[key]);
            }
          }

          console.log("movieList", $scope.movieList);

        })
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


      // $scope.movie = false;
      // $scope.findTitle = "";

    };

    }


]);
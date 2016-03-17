"use strict";

app.controller("FindCtrl", [
  "$scope",
  "MovieFactory",
  "FirebaseFactory",
  "$http",
  "firebaseURL",

  function($scope, MovieFactory, FirebaseFactory, $http, firebaseURL) {
    $scope.findTitle = "";
    $scope.filterOptions;
    $scope.movieList;

    // this function is triggered by find button
    $scope.find = function() {

      $scope.filterOptions = {};

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
          if ($scope.findTitle){
            for (let key in movieCollection) {
              if (movieCollection[key].title.toLowerCase().indexOf(searchStr) > -1) {
                $scope.movieList.push(movieCollection[key]);
              }
            }
          } else {
             for (let key in movieCollection) {
              $scope.movieList.push(movieCollection[key]);
            }
          }

          console.log("movieList", $scope.movieList);

        })
    }

    $scope.resetFilterOptions = function () {
      $scope.filterOptions = {};
    }

    $scope.toggleUntracked = function () {
      //only untracked movies returned from OMDB API have a "Response" key of "True"
      $scope.filterOptions = {Response: "True"};
    }
    
    $scope.toggleUnwatched = function () {
      $scope.filterOptions = {watched: false};
    }

    $scope.toggleWatched = function () {
      $scope.filterOptions = {watched: true};
    }

    $scope.toggleFavorites = function () {
      $scope.filterOptions = {rating: "10"};
    }



    $scope.add = function (movie) {
      // console.log("movie", movie);
      console.log("movieList", $scope.movieList);

      let newMovie = {
          title: movie.Title,
          year: movie.Year,
          actors: movie.Actors,
          rating: "0",
          watched: false,
          tracked: true,
          imdbID: movie.imdbID
        };

      // POST the song to Firebase
      $http.post(
        "https://nss-team-america.firebaseio.com/movies.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify(newMovie)

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => console.log("Added movie to firebase"),// Handle resolve
        (response) => console.log(response)  // Handle reject
      );


      //find the index of the OMDB movie in the movielist that we want to add
      let index = $scope.movieList.indexOf(movie);
      //overwrite that index to be the newMovie object (firebase format) with watched and tracked keys
      $scope.movieList[index] = newMovie;
    };




    $scope.delete = function (movie) {
      //remove movie from movieList
      let movieIndex = $scope.movieList.indexOf(movie);
      if (movieIndex >= 0) {
        $scope.movieList.splice(movieIndex, 1);
      }

      //delete movie from firebase
      $.ajax({
        url: firebaseURL +`/movies/${movie.id}.json`,
        method: 'DELETE'
      })
      .done(function() {
        console.log("movie deleted from firebase");
      })
      .fail(function() {
        console.log("error while deleting movie from firebase");
      });
    };

    }


]);
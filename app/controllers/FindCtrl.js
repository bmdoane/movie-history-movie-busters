"use strict";

app.controller("FindCtrl", [
  "$scope",
  "MovieFactory",
  "FirebaseFactory",
  "$http",
  "firebaseURL",

  function($scope, MovieFactory, FirebaseFactory, $http, firebaseURL) {
    $scope.findTitle = "";
    $scope.breadcrumb = "";
    $scope.filterOptions = "";
    $scope.movieList;
    $scope.lastFilter = "";

    // this function is triggered by search button
    // takes findTitle string and returns search results from OMDB API and Firebase
    $scope.find = function() {


      //if search bar is empty, 
      if (!$scope.findTitle){
        return
      }

      //start with an empty movieList (nothing on page)
      $scope.movieList = [];

      //search for matching title from OMDB only if search input is longer than 1 character (OMDB returns error for 1 character search)
      if ($scope.findTitle.length > 1) {
        MovieFactory($scope.findTitle).then(
        	movie => {
            //if returned, add movie from OMDB to movieList 
            if (movie) {
              $scope.movieList.push(movie);
            }
        	},
        	err => console.log(err)
        	);
      }

    // takes findTitle string and returns search results from Firebase
      FirebaseFactory().then(
        movieCollection => {
          //allow for uppercase & lowercase matches
          let searchStr = $scope.findTitle.toLowerCase();

          console.log("movieCollection from FB", movieCollection);

          //if findTitle is not the empty string, try to find a movie matching the search and add it to the movieList
          if ($scope.findTitle){
            for (let key in movieCollection) {
              if (movieCollection[key].title.toLowerCase().indexOf(searchStr) > -1) {
                $scope.movieList.push(movieCollection[key]);
              }
            }
          } else {
              //if findTitle is the empty string, add all the movies to the movieList
             for (let key in movieCollection) {
              $scope.movieList.push(movieCollection[key]);
            }
          }
          console.log("movieList result", $scope.movieList);
        })
    }

    //clear the search input and remove all movies from the movieList (none displayed on page)
    $scope.clearSearch = function () {
      $scope.findTitle = "";
      $scope.movieList = [];
    }



    $scope.resetFilterOptions = function () {
      $scope.filterOptions = "";
      $scope.breadcrumb = "All";
    }

    $scope.toggleUntracked = function () {
      //only untracked movies returned from OMDB API have a "Response" key of "True"
      if ($scope.lastFilter === "Untracked"){
        if ($scope.filterOptions){
          $scope.resetFilterOptions();
        } else{
          $scope.filterOptions = {Response: "True"};
          $scope.breadcrumb = "Untracked";
        } 
      } else {
        $scope.filterOptions = {Response: "True"};
        $scope.breadcrumb = "Untracked";  
      }

      $scope.lastFilter = "Untracked";
    }
    

    $scope.toggleUnwatched = function () {
      if ($scope.lastFilter === "Unwatched"){
        if ($scope.filterOptions){
          $scope.resetFilterOptions();
        } else{
          $scope.filterOptions = {watched: false};
          $scope.breadcrumb = "Unwatched";
        } 
      } else {
        $scope.filterOptions = {watched: false};
        $scope.breadcrumb = "Unwatched";  
      }

      $scope.lastFilter = "Unwatched";
    }


    $scope.toggleWatched = function () {
      if ($scope.lastFilter === "Watched"){
        if ($scope.filterOptions){
          $scope.resetFilterOptions();
        } else{
          $scope.filterOptions = {watched: true};
          $scope.breadcrumb = "Watched";
        } 
      } else {
        $scope.filterOptions = {watched: true};
        $scope.breadcrumb = "Watched";  
      }

      $scope.lastFilter = "Watched";
    }


    $scope.toggleFavorites = function () {
      if ($scope.lastFilter === "Favorites"){
        if ($scope.filterOptions){
          $scope.resetFilterOptions();
        } else{
          $scope.filterOptions = {rating: "10"};
          $scope.breadcrumb = "Favorites";
        } 
      } else {
        $scope.filterOptions = {rating: "10"};
        $scope.breadcrumb = "Favorites";  
      }

      $scope.lastFilter = "Favorites";
    }


    $scope.add = function (movie) {
      // console.log("movie", movie);
      console.log("movieList", $scope.movieList);

      let newMovie = {
          title: movie.Title,
          year: movie.Year,
          actors: movie.Actors,
          rating: 0,
          watched: false,
          tracked: true,
          imdbID: movie.imdbID
        };

      // POST the song to Firebase
        // Remember to stringify objects/arrays before
        // sending them to an API
        // The $http.post() method returns a promise, so you can use then()
      $http.post(
        "https://nss-team-america.firebaseio.com/movies.json",
        JSON.stringify(newMovie)
      ).then(
        () => console.log("Added movie to firebase"),// Handle resolve
        (response) => console.log(response)  // Handle reject
      );
      //find the index of the OMDB movie in the movielist that we want to add
      //overwrite that index to be the newMovie object (firebase format) with watched and tracked keys
      let index = $scope.movieList.indexOf(movie);
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
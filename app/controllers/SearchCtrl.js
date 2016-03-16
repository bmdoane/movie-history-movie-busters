"use strict";

app.controller("SearchCtrl", [
  "$scope",
  "FirebaseFactory",

  function($scope, FirebaseFactory) {
    $scope.searchUserMovie = "";
    // $scope.filter = "";

    // $scope.filterUnwatched = function() {
    //   $scope.filter = "movie.watched"
    // }

    // this function is triggered by search button
    $scope.search = function() {
    // takes searchUserMovie string and shows matching movie posters
    }

    $scope.movies = [];

    // Invoke the promise that reads from Firebase
    FirebaseFactory().then(
      // Handle resolve() from the promise
      userCollection => { Object.keys(userCollection).forEach(key => {
        userCollection[key].id = key;
        $scope.movies.push(userCollection[key]);
      })
      console.log($scope.movies)
    },
      // Handle reject() from the promise
      err => console.log(err)
    );
  }

]);
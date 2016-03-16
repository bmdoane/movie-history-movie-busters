"use strict";

app.controller("selectedMovie", [
  "$scope",
  "movieFactory",
  
  function($scope, movieFactory) {

    movieFactory(searchString).then(
    // Resolve
    function (selected) {
    	$scope.selectedMovie = selected;
      console.log("selectedMovie: ", $scope.selectedMovie);
    },
    // Reject
    function(err) {
      console.log(err);
    }
    );

    // ng-click test
    $scope.test = function() {
    	console.log("test");
    }

  }
]);

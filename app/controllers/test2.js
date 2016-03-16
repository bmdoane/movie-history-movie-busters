"use strict";

app.controller("test2Ctrl", [
  "$scope",
  "movieFactory",
  
  function($scope, movieFactory) {

    movieFactory().then(
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

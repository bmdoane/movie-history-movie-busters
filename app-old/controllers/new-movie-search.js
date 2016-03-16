"use strict";

app.controller("searchInput", [
    "$scope",
    "movieFactory",

    function($scope, searchString, movieFactory) {
        $scope.enterKP = function(keyEvent) {
        if (keyEvent.which === 13)
            console.log("Keypress worked");
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
        }
    }

]);
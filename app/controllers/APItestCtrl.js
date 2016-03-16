"use strict";

app.controller("APItestCtrl", [
  "$scope",
  "movieFactory",
  
  function($scope, movieFactory) {
    movieFactory().then(
    // Resolve
    function (selectedMovie) {
      console.log("selectedMovie: ", selectedMovie);
    },
    // Reject
    err => console.log(err)
    );

  }
]);

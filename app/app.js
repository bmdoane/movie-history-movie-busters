"use strict";

let app = angular.module("MovieHistory", ['ngRoute', 'firebase'])
.constant('firebaseURL', "https://mb-movie-history.firebaseio.com");

console.log("hello?");

movieFactory().then(
// Resolve
function (selectedMovie) {
  console.log("selectedMovie: ", selectedMovie);
},
// Reject
err => console.log(err)
);

"use strict";

let app = angular.module("MovieHistory", ['ngRoute', 'firebase'])
.constant('firebaseURL', "https://mb-movie-history.firebaseio.com");

app.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/instructions.html",
        controller: "APItestCtrl"
      }).
      when("/test2", {
        templateUrl: "partials/test2.html",
        controller: "selectedMovie"
      }).
      otherwise({
        redirectTo: "/"
      });
  }]);


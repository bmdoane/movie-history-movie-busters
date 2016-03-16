"use strict";

let app = angular.module("MovieHistory", ['ngRoute', 'firebase'])
.constant('firebaseURL', "https://mb-movie-history.firebaseio.com");

app.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/test1.html",
        controller: "test1Ctrl"
      }).
      when("/test2", {
        templateUrl: "partials/test2.html",
        controller: "test2Ctrl"
      }).
      otherwise({
        redirectTo: "/"
      });
  }]);


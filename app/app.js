"use strict";

let app = angular.module("MovieHistory", ["ngRoute", "firebase"]).constant('firebaseURL', "https://nss-team-america.firebaseio.com");


/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */
let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/how-to.html",
        resolve: { isAuth }
      }).
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/display", {
        templateUrl: "partials/display.html",
        controller: "FindCtrl",
        resolve: { isAuth }
      }).
      otherwise({
        redirectTo: "/"
      });
  }]);


/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
app.run([
  "$location",

  ($location) => {
    let appRef = new Firebase("https://nss-team-america.firebaseio.com");

    appRef.onAuth(authData => {
      if (!authData) {

        console.log("onAuth detected unauthenticated client");
        $location.path("/login");
      }
    });
  }
]);
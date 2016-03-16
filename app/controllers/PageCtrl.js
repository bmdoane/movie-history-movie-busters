"use strict";
// If you are not logged in you are not authorized to use app
app.controller("PageCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",

  ($scope, $location, $http, authFactory, firebaseURL) => {

    // Local variables
    let ref = new Firebase(firebaseURL);

    $scope.isAuthenticated = () => {
      return authFactory.isAuthenticated();
    };


    $scope.logout = () => {
      console.log("Unauthenticating user");
      ref.unauth();
    };

  }
]);

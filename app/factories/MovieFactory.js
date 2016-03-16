"use strict";

app.factory("movieFactory", function($q, $http) {

  function getMovies() {

    // Return a promise for our async XHR
    return $q(function(resolve, reject) {

      // Perform some asynchronous operation, resolve or reject 
      // the promise when appropriate.
      $http.get('http://www.omdbapi.com/?t=bottle+rocket&y=&plot=short&r=json') // TEST URL
      .success(
        function(selectedMovie) {
          resolve(selectedMovie);
        },function(error) {
          reject(error);
        }
      );

    });
  }
  return getMovies;
});


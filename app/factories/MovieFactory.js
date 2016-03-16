"use strict";

app.factory("MovieFactory", ($q, $http) =>
  (title) =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get(`http://www.omdbapi.com/?t=${title}&y=&plot=short&r=json&apikey=7c212437`)
        .success(
          movieCollection => resolve(movieCollection),
          error => reject(error)
        )
    )
);
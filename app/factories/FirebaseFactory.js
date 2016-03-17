"use strict";

// Returning a promise of the user movie data
app.factory("FirebaseFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("https://nss-team-america.firebaseio.com/movies.json")
        .success(
          userCollection => {
            for (let key in userCollection){
              userCollection[key].id = key;
            }
            resolve(userCollection)
          },
          error => reject(error)
        )
    )
);
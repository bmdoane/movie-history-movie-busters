"use strict";

app.factory("authFactory", (firebaseURL) => {
  let ref = new Firebase(firebaseURL);

  return {

    getUserID () {
      //use authData.uid to store users movies under their user id
      console.log("authData", authData);

      let authData = ref.getAuth();
      return authData.uid;
    },

    /*
      Determine if the client is authenticated
     */
    isAuthenticated () {
      let authData = ref.getAuth();

      if (authData) {
        return true;
      } else {
        return false;
      }
    },
    /*
      Authenticate the client via Firebase
     */
    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            console.log("authWithPassword method completed successfully");
            resolve(authData);
          }
        });
      });
    }
  };
});

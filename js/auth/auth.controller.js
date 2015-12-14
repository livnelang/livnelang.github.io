myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    $scope.user = {
      username: 'arvind@myApp.com',
      password: 'pass123'
    };
 
    $scope.login = function() {
 
      var username = $scope.user.username,
        password = $scope.user.password;
 
      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {
       
       	  /* We set client side session variables */
       	  /* We store the values in the AuthenticationFactory as well as sessionStorage */
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.user = data.user.username;
          AuthenticationFactory.userRole = data.user.role;
 
          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
          $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
 
          $location.path("/songs");
 
        }).error(function(status) {
          console.log('Oops something went wrong!') ;
        });
      } else {
        console.log('Invalid credentials');
      }
 
    };
 
  }
]);
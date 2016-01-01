myApp.factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: true,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }
 
  return auth;
});
 
myApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(username, password) {
      return $http.post('https://band-songs.herokuapp.com/login', {
        username: username,
        password: password
      });
    },
    logout: function() {
 
      if (AuthenticationFactory.isLogged) {
 
        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
        delete AuthenticationFactory.userRole;
 
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.userRole;
 
        $location.path("/login");
      }
 
    }
  }
});
 
 /*
 * Will send the access token and the key along
 * with each request to the server
 */
myApp.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },
 
    response: function(response) {
      return response || $q.when(response);
    }
  };
});
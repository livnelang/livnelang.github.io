var myApp = angular.module('ngclient', ['ui.router','angular-vibrator','ngDialog']);
 
myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider)  {
 
  $httpProvider.interceptors.push('TokenInterceptor');

  $urlRouterProvider.otherwise("songs");
 
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).state('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    }).state('/page1', {
      templateUrl: 'views/page1.html',
      controller: 'Page1Ctrl',
      access: {
        requiredLogin: true
      }
    }).state('/page2', {
      templateUrl: 'views/page2.html',
      controller: 'Page2Ctrl',
      access: {
        requiredLogin: true
      }
    }).state('songs', {
      url: '/songs',
      templateUrl: 'views/songs.html',
      controller: 'songsController',
      access: {
        requiredLogin: false
      }
    })
    .state('youtube', {
      url: '/youtube',
      templateUrl: 'views/youtube-frame.html',
      controller: 'youtubeController',
      access: {
        requiredLogin: false
      }
    })
    .state('create', {
      url: '/create',
      templateUrl: 'views/create-song.html',
      controller: 'createController',
      access: {
        requiredLogin: false
      }
    });
});
 
myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();
 
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
      console.log('inside fetch jwt');  
    } else {
      console.log('inside fetch jwt');
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/songs');
    }
  });
});
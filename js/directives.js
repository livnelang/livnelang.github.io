/******************************
 *
 * Top Navbar directive
 *
 ******************************/
myApp.directive('topBar',['$location','$state', function($location,$state){
    return {
        restrict: 'E',
        replace: true,
        scope:{
        },
        templateUrl: 'views/top-bar.html',
        link: function($scope, element, attrs) {

        }
    };
}]);

/******************************
 *
 * Top Navbar directive
 *
 ******************************/
myApp.directive('topBar',['dataFactory','$location','$state', function(dataFactory, $location,$state){
    return {
        restrict: 'E',
        replace: true,
        scope:{
        },
        templateUrl: 'views/top-bar.html',
        link: function($scope, element, attrs) {
        	$scope.removeItem = function() {
        			console.log('inside top-bar directive');
        			console.log(dataFactory);
                    if(dataFactory.choice != null) {
                        console.log('inside directive remove location');
                        dataFactory.removeSong();
                    }
                    return;
                }

        }
    };
}]);

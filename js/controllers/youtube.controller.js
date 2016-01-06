angular.module('ngclient').controller('youtubeController',['$scope', '$http','$sce','dataFactory', function($scope, $http, $sce, dataFactory) {
    $scope.video = $sce.trustAsResourceUrl(dataFactory.youtube);
    console.log('video link: ' + $scope.video);
    console.log('window height: ' + $(window).height());


    /*
    * When Redy, catch ng-scope wrapper and resize it
    */
    $( document ).ready(function() {
    	console.log( "ready!" );
    	//$('.ng-scope').height( $(window).height() );
	});

}]);

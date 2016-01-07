angular.module('ngclient').controller('chordsController',['$scope', '$http','$sce','dataFactory', function($scope, $http, $sce, dataFactory) {
    $scope.chords = $sce.trustAsResourceUrl(dataFactory.chords);
    console.log('video link: ' + $scope.chords);


    /*
    * When Redy, catch ng-scope wrapper and resize it            --> Consider Setting the iframe height with calculation of Device Height Size
    */
    $( document ).ready(function() {
    	console.log( "ready!" );
    	//$('.ng-scope').height( $(window).height() );
	});

}]);

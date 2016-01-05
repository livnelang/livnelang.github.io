angular.module('ngclient').controller('youtubeController',['$scope', '$http','$sce','$stateParams', function($scope, $http, $sce, $stateParams) {
    $scope.video = ($stateParams.video);
    console.log('video link: ' + $scope.video);

}]);

angular.module('ngclient').controller('createController',['$scope','$http','$state', function($scope, $http, $state) {
    
    /*
    * Function to add a new song to the list
    */
    $scope.addNewSong = function() {
    	console.log('inside new song client');
    	console.log($scope.item);
    	$http.post("http://localhost:3000/api/v1/song", $scope.item).success(function(data, status) {
            console.log('song was saved');
            if(data!= null) {
                $state.go('songs', {}, { reload: true });
            }
        }),
        function err(err) {
            console.log('error saving the song');
        }

    }

}]);
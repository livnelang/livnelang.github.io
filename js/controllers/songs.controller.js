angular.module('ngclient').controller('songsController',['$scope', 'dataFactory','$http','$state', function($scope, dataFactory, $http, $state) {
    $scope.products = [];

    //$scope.
    //console.log('First taste of songs controller');
    // Access the factory and get the latest products list
    $http.get("https://band-songs.herokuapp.com/api/v1/songs").success(function(data, status) {
      $scope.products = data;
      console.log('current songs: ' + $scope.products.length);
    });

    $scope.refreshSongs = function() {
        $http.get("https://band-songs.herokuapp.com/api/v1/songs").then(function(response) {
            console.log('inside refresh');
        $scope.products = [];
        $scope.products = response.data;
        console.log('current songs: ' + $scope.products.length);
        });
    }

    /*
    * Function to remove a song from the list
    */
    $scope.removeSong = function(selected) {
        console.log('inside remove song: ' + selected);
        $http.delete("https://band-songs.herokuapp.com/api/v1/song/" + selected._id).then(function(response) {
            console.log(response.data.item_deleted);
            if(response.data.item_deleted =="success") {
                console.log('harray');
                var index = $scope.products.indexOf(selected);
                $scope.products.splice(index, 1);    
            }
        });


    }

    /*
    * Function to add a new song to the list
    */
    $scope.addNewSong = function() {
    	console.log('inside new song client');
    	console.log($scope.item);
    	$http.post("https://band-songs.herokuapp.com/api/v1/song", $scope.item).success(function(data, status) {
            console.log('song was saved');
            if(data!= null) {
                $scope.products.push($scope.item);
            }
        }),
        function err(err) {
            console.log('error saving the song');
        }

    }


 
  

}]);
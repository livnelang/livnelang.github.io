angular.module('ngclient').controller('songsController',['$scope', 'dataFactory','$http','$state','vibrator', function($scope, dataFactory, $http, $state, vibrator) {
    $scope.products = [];
    $scope.choice = {};

    //$scope.
    //console.log('First taste of songs controller');
    // Access the factory and get the latest products list
    $http.get("http://localhost:3000/api/v1/songs").then(function(response) {
      $scope.products = [];
      $scope.products = response.data;
      console.log('current xhr songs: ' + response.data.length);
      console.log('current songs: ' + $scope.products.length);
    });

    /*$scope.refreshSongs = function() {
        $http.get("https://band-songs.herokuapp.com/api/v1/songs").then(function(response) {
            console.log('inside refresh');
        $scope.products = [];
        $scope.products = response.data;
        console.log('current songs: ' + $scope.products.length);
        });
    } */

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

    /*
   * On Location Tap Vibrate
   */
   $scope.vibrate = function($event, song) {
     vibrator.vibrate(200);
     /* If We Already Selected One */
     if($scope.choice.element) {
        $($scope.choice.element).removeClass("tapped_back");
     }
     /* Replace With the second One */
     $scope.choice.song = song;
     dataFactory.choice = $scope.choice.song; // Set the selected song for the factory
     $scope.choice.element = $($event.target).parent();
     $($scope.choice.element).addClass("tapped_back");
     // Send to factory selected location
     //localstorage.setLocation($scope.choice.location);
   };


}]);

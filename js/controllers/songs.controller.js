angular.module('ngclient').controller('songsController',['$scope', 'dataFactory','$http','$state','vibrator', function($scope, dataFactory, $http, $state, vibrator) {
    $scope.products = [];
    $scope.choice = {};
    // Reset factory.choice 
    dataFactory.choice = null;

    //$scope.
    //console.log('First taste of songs controller');
    // Access the factory and get the latest products list
    $http.get("https://band-songs.herokuapp.com/api/v1/songs").then(function(response) {
      $scope.products = [];
      $scope.products = response.data;
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

   /*
   * Relates to youtube page, with factory parameter
   */
   $scope.youtubeRelate = function(link) {
        dataFactory.youtube = link;
        $state.go('youtube');
   }

   /*
   * Relates to chords page, with factory parameter
   */
   $scope.chordsRelate = function(link) {
        dataFactory.chords = link;
        $state.go('chords');
   }


}]);

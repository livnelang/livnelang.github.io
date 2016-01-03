myApp.factory('dataFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = 'http://localhost:3000/api/v1/songs';
  var _prodFactory = {};
 
  _prodFactory.getProducts = function() {
    $http.get(urlBase).then( function(response) {
    	return response.data;
    });
  }; 

  /*
  * Refresh Our Songs List
  */
  _prodFactory.refreshProducts = function() {
  	return $http.get(urlBase);
  }

    /*
    * Function to remove a song from the list
    */
    _prodFactory.removeSong = function() {
        console.log('inside dataFactory remove song: ' + _prodFactory.choice);
        /*$http.delete("https://band-songs.herokuapp.com/api/v1/song/" + selected._id).then(function(response) {
            console.log(response.data.item_deleted);
            if(response.data.item_deleted =="success") {
                console.log('harray');
                var index = $scope.products.indexOf(selected);
                $scope.products.splice(index, 1);    
            }
        }); */


    }
 
  //console.log(_prodFactory.getProducts());
  return _prodFactory;
});

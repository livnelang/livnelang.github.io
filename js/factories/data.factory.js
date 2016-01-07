myApp.factory('dataFactory', function($http, $q) {
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
        var deferred = $q.defer();

        console.log('inside dataFactory remove song: ' + _prodFactory.choice);
        deferred.resolve($http.delete("https://band-songs.herokuapp.com/api/v1/song/" + _prodFactory.choice._id).then(function(response) {
            console.log(response.data.item_deleted);
            if(response.data.item_deleted =="success") {
                console.log('harray');
                _prodFactory.choice = null; // reset song to null value
                /*var index = $scope.products.indexOf(selected);
                $scope.products.splice(index, 1);   */ 
            }
        }));

        return deferred.promise;


    }
 
  //console.log(_prodFactory.getProducts());
  return _prodFactory;
});

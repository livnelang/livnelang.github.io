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
 
  //console.log(_prodFactory.getProducts());
  return _prodFactory;
});

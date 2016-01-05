/******************************
 *
 * Top Navbar directive
 *
 ******************************/
myApp.directive('topBar',['dataFactory','$location','$state','ngDialog', function(dataFactory, $location,$state, ngDialog){
    return {
        restrict: 'E',
        replace: true,
        scope:{
        },
        templateUrl: 'views/top-bar.html',
        link: function($scope, element, attrs) {
        	$scope.removeItem = function() {
        			console.log('inside top-bar directive');
                    if(dataFactory.choice != null) {
                        ngDialog.openConfirm({
                            template:'\
                                <h2>Delete Song ?</h2>\
                                <div class="ngdialog-buttons">\
                                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
                                </div>',
                            plain: true
                            }).then(function (success) {
                                dataFactory.removeSong().then( function() {
                                    $state.reload();
                                });
                                }, function (error) {
                                });
                    }
                    return;
                }

        }
    };
}]);

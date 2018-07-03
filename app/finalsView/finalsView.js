angular.module('myApp.finalsView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/final', {
    templateUrl: 'finalsView/finalsView.html',
    controller: 'FinalsView'
  });
}])

.controller('FinalsView', ['$scope','Team', '$interval', 'teamService','$location', function($scope,Team,$interval, teamService, $location) {
    if(Object.keys(teamService.get()).length === 0){
        $location.path("/");
    }
    $scope.teams = teamService.get();
    $scope.show = true;
    $scope.toggleButton = false;
}]);
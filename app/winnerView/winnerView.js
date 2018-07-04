angular.module('myApp.winnerView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/winner', {
    templateUrl: 'winnerView/winnerView.html',
    controller: 'WinnerView'
  });
}])

.controller('WinnerView', ['$scope', 'teamService','$location', function($scope, teamService, $location) {
    if(teamService.getWinner() === undefined) $location.path("/");
    $scope.winner = teamService.getWinner();
    $scope.bet = teamService.getBet();
}])
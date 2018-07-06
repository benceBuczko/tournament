angular.module('myApp.finalsView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/final', {
    templateUrl: 'finalsView/finalsView.html',
    controller: 'FinalsView'
  });
}])

.directive('finalPairs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      teams: '=',
      indexLimit: "=",
      greater: '='
    },
    templateUrl: 'finalsView/final-pairs.html'
  };
})

.controller('FinalsView', ['$scope', '$interval', 'teamService','$location', function($scope,$interval, teamService, $location) {
    if(teamService.getGroupWinners() === undefined){
        $location.path("/");
        return;
    }
    $scope.teams = teamService.getGroupWinners();
    $scope.currentTeams;
    $scope.round = 0;
    $scope.bet = teamService.getBet();
    $scope.isStillHope = $scope.teams.some((team) => team.name === $scope.bet);
    $scope.showTeams = false;
    $scope.rounds = {first: [], second: [], third: []}
    $scope.toggleButton = false;
    $scope.stopInterval = function(){
      $interval.cancel($scope.interval);
      $scope.toggleButton = false;
      $(function () {
        $('[data-toggle="popover"]').popover("enable");
      })
    }
    $scope.restartInterval = function(){
      $(function () {
        $('[data-toggle="popover"]').popover("disable");
      });
      $scope.toggleButton = true;
      $scope.showTeams = true;
      $scope.playRound();
      $scope.round++;
      $scope.interval = $interval(() => {
        $scope.playRound();
        $scope.round++;
      }, 2000);
    }
    $scope.playRound = function(){
      if($scope.round === 0){
        $scope.rounds.first = $scope.teams;
        $scope.currentTeams = $scope.rounds.first;
      } else if ($scope.round === 1){
        $scope.rounds.second = $scope.rounds.first.filter((team) => team.win === true).map(team => {
          let teamCopy = Object.assign({}, team);
          teamCopy.win = false;
          return teamCopy;
        });
        $scope.currentTeams = $scope.rounds.second;
      } else if($scope.round === 2){
        $scope.rounds.third = $scope.rounds.second.filter((team) => team.win === true).map(team => {
          let teamCopy = Object.assign({}, team);
          teamCopy.win = false;
          return teamCopy;
        });
        $scope.currentTeams = $scope.rounds.third;
      } else {
        $interval.cancel($scope.interval);
        teamService.setWinner($scope.rounds.third.filter((team) => team.win === true)[0]);
        $location.path("/winner");
        return;
      }
      $scope.currentTeams.forEach((team, index, teams)=>{
        if (index % 2 === 0){
          team.score = Math.floor(Math.random() * 10);
          teams[index+1].score = Math.floor(Math.random() * 10);
          while(team.score === teams[index+1].score) {
            teams[index+1].score = Math.floor(Math.random() * 10);
          }
          if(team.score > teams[index+1].score){
            team.win = true;
          } else {
            teams[index+1].win = true;
          }
        }
      }) 
    }
}]);
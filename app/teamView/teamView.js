'use strict';

angular.module('myApp.teamView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'teamView/teamView.html',
    controller: 'TeamsView'
  });
}])

.controller('TeamsView', ['$scope','Team', function($scope,Team) {
    Team.get(function(data){
      $scope.teams = Array(32).fill().map((team, i)=>{
        team = { id: i, name: 'Team ' + i, members: Array(11), win: false, score: 0, semiScore: 0, goals: 0};
        team.members = team.members.fill().map((member, index)=>{
          member = data.results[(i+1)*index].name.first + " " + data.results[i+1*index].name.last;
          return member;
        })
        return team;
      });
    });
}]);
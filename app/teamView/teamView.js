'use strict';

angular.module('myApp.teamView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'teamView/teamView.html',
    controller: 'TeamsView'
  });
}])

.controller('TeamsView', ['$scope','Team', '$interval', 'teamService', function($scope,Team,$interval, teamService) {
    $scope.show = false;
    $scope.toggleButton = false;
    $scope.showGroups = false;
    $scope.round = 0;
    $scope.nextPage = false;
    $scope.teamNames = ["Argentina", "Australia", "Belgium", "Brazil", "Colombia", "Costa Rica", "Croatia", "Denmark", "Egypt", "England", "France", "Germany", "Iceland", "Iran", "Japan", "Korea Republic", "Mexico", "Morocco", "Nigeria", "Panama", "Peru", "Poland", "Portugal", "Russia", "Saudi Arabia", "Senegal", "Serbia", "Spain", "Sweden", "Switzerland","Tunisia", "Uruguay"];
    Team.get(function(data){
      $scope.teams = Array(32).fill().map((team, i)=>{
        team = { id: i, name: $scope.teamNames[i], members: Array(11), win: false, score: 0, semiScore: 0, goals: 0};
        team.members = team.members.fill().map((member, index)=>{
          member = data.results[(i+1)*index].name.first + " " + data.results[i+1*index].name.last;
          return member;
        })
        return team;
      });
      $scope.groups = Array(8).fill().map((group, index)=>{
        group = {id: index, name: "Group " + String.fromCharCode('A'.charCodeAt() + index), teams: Array(4), matches:Array(6)};
        group.teams = group.teams.fill().map((team, index2) => $scope.teams[index*4 + index2]);
        group.matches = group.matches.fill().map((match, index3) =>{
          if(index3 < 3) {
            match = {teams: [group.teams[0], group.teams[index3+1]], winner: "-", round: index3+1};
          } else if(index3 < 5){
            match = {teams: [group.teams[1], group.teams[index3-1]], winner: "-", round: (index3*-1)+6};
          } else {
            match = {teams: [group.teams[2], group.teams[3]], winner: "-", round: 1};
          }
          match.score = "Not played yet";
          return match;
        });
        return group;
      });
      $scope.show = true;
    });
    $scope.stopInterval = function(){
      $interval.cancel($scope.interval);
      $scope.toggleButton = false;
    }
    $scope.restartInterval = function(){
      $scope.toggleButton = true;
      $scope.showGroups = true;
      $scope.interval = $interval(() => {
        if($scope.round > 1 ){
          $interval.cancel($scope.interval);
        }
        $scope.game();
      }, 2000);
    }
    $scope.showMatches = function(id){
      document.getElementById("match"+ id).classList.toggle("show");
    }
    $scope.game = function(){
      $scope.round++;
      $scope.groups.forEach((group)=> {
        group.matches.forEach((match) => {
            if(match.round === $scope.round){
              let firstTeamScore = Math.floor(Math.random() * 10);
              let secondTeamScore = Math.floor(Math.random() * 10);
              match.score = firstTeamScore + "-" + secondTeamScore;
            if(firstTeamScore > secondTeamScore){
              match.winner = match.teams[0].name;
              match.teams[0].semiScore+=3;
            } else if (firstTeamScore < secondTeamScore){
              match.winner = match.teams[1].name;
              match.teams[1].semiScore+=3;
            } else {
              match.winner = "Draw"
              match.teams[0].semiScore+=1;
              match.teams[1].semiScore+=1;
            }
            match.teams[0].goals += firstTeamScore;
            match.teams[1].goals += secondTeamScore;
          }
        });
      });
      $scope.groups.forEach((group) => {
        group.teams.sort((a,b) => {
          if (b.semiScore - a.semiScore > 0){
            return 1;
          } else if (b.semiScore - a.semiScore < 0){
            return -1;
          }
          return b.goals - a.goals;
        });
      });
      if($scope.round > 2){
        teamService.set(Array(16).fill().map((team, index) => {
          let teamIndex = (index % 2 === 0) ? 0 : 1;
          return $scope.groups[Math.floor(index/2)].teams[teamIndex];
        }));
        $scope.nextPage = true;
      }
    }
    $scope.shuffle = function(a){
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    }
}]);
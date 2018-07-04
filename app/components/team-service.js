var teamService = angular.module('teamService', ['ngResource']);

teamService.factory('teamService', ['$resource', function($resource) {
  var groupWinners;
  var winner;
  var bet;
  function setGroupWinners(data) {
    groupWinners = data;
  }
  function getGroupWinners() {
   return groupWinners;
  }
  function setWinner(data){
    winner = data;
  }
  function getWinner(){
    return winner;
  }
  function setBet(data){
    bet = data;
  }
  function getBet(){
    return bet;
  }
  return {
   setGroupWinners: setGroupWinners,
   getGroupWinners: getGroupWinners,
   setWinner: setWinner,
   getWinner: getWinner,
   setBet: setBet,
   getBet: getBet,
   getTeamMembers: $resource('https://randomuser.me/api/?results=352', {}, {
    query: {method:'GET'}
  })
  }
}]);
 
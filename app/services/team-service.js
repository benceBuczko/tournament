var teamService = angular.module('myApp.teamService', ['ngResource']);

teamService.factory('teamService', ['$resource', function($resource) {
  var groupWinners;
  var winner;
  var bet;
  const memberResource =  $resource('https://randomuser.me/api/?results=352', {}, {
    query: {method:'GET'}
  });

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
  function getTeamMembers() {
    return memberResource;
  }
  
  return {
   setGroupWinners: setGroupWinners,
   getGroupWinners: getGroupWinners,
   setWinner: setWinner,
   getWinner: getWinner,
   setBet: setBet,
   getBet: getBet,
   getTeamMembers: getTeamMembers
  }
}]);
 
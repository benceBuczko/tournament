var teamService = angular.module('teamService', ['ngResource']);

teamService.factory('Team', ['$resource',
function($resource){
  return $resource('https://randomuser.me/api/?results=352', {}, {
    query: {method:'GET'}
  });
}]);

teamService.factory('teamService', function() {
  var savedData = {}
  function set(data) {
    savedData = data;
  }
  function get() {
   return savedData;
  }
 
  return {
   set: set,
   get: get
  }
 
 });
 
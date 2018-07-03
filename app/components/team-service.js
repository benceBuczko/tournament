var teamService = angular.module('teamService', ['ngResource']);

teamService.factory('Team', ['$resource',
function($resource){
  return $resource('https://randomuser.me/api/?results=352', {}, {
    query: {method:'GET'}
  });
}]);
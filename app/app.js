'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.teamView',
  'myApp.finalsView',
  'myApp.winnerView',
  'myApp.teamService'
]).
config(['$routeProvider', function( $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

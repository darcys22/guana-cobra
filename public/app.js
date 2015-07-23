'use strict';

    //'angular-advanced-searchbox',
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'myApp.landing',
    'myApp.mybooks',
    'cookieService',
    'angular-advanced-searchbox',
    'myApp.hordemind'
]).

config(['$routeProvider', function($routeProvider) {

  // Set default view of our app to the landing page
  $routeProvider.otherwise({
    redirectTo: '/landing'

  });

}]).

run(['$rootScope', '$cookies', 'cookieService',
    function($rootScope, $cookies, cookieService) {

      $rootScope.userId = $cookies.get('current.user') || cookieService.newCookie();

}]);



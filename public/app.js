'use strict';

    //'angular-advanced-searchbox',
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'myApp.landing',
    'myApp.mybooks',
    'angular-advanced-searchbox',
    'myApp.hordemind'
]).

config(['$routeProvider', function($routeProvider) {

  // Set default view of our app to the landing page
  $routeProvider.otherwise({
    redirectTo: '/landing'

  });

}]).

run(['$rootScope', '$cookieStore',
    function($rootScope, $cookieStore) {

      var cookieService = 'c4ca4238a0b923820dcc509a6f75849b';
      $rootScope.userId = $cookieStore.get('current.user') || cookieService;

}]);



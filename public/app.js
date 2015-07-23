'use strict';

    //'angular-advanced-searchbox',
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
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

run(['$rootScope', function($rootScope) {

    var ec = new evercookie({silverlight: false});
    var cookieService = "c4ca4238a0b923820dcc509a6f75849b";
    $rootScope.cookieReady = false;

    ec.get("id", function(value) {
      $rootScope.cookieReady = true;
      if (value) {
        $rootScope.userid = value;
      } else {
        $rootScope.userid = cookieService;
        ec.set("id", $rootScope.userid);
      }
    });
}]);



(function () {
  'use strict';

angular.module('myApp.landing', ['ngRoute'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
    templateUrl: 'partials/landing.html',
    controller: 'LandingController'
  });
}])

.controller('LandingController', ['$scope', '$http', function($scope, $http) {
  $scope.title = "Our New Foundation";
  $http.get('/api/story').then(function (response) {
    $scope.body = response.data;
  });

}]);

})();


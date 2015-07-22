(function () {

  var injectParams = [];

  var startFrom = function () {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start)
    }
  };

  startFrom.$inject = injectParams;

  angular.module('myApp').filter('startFrom', startFrom);
}());

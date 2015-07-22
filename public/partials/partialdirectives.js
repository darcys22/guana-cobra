(function () {

  var viewSelecter = function () {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'partials/viewselecter.html'
    }
  };

  var coverView = function () {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'partials/coverview.html'
    }
  };

  var listView = function () {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'partials/listview.html'
    }
  };

  angular.module('myApp')
    .directive('viewSelecter', viewSelecter)
    .directive('coverView', coverView)
    .directive('listView', listView);
}());


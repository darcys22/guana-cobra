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

  var searchBar = function () {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'partials/search.html'
    }
  };

  angular.module('myApp')
    .directive('viewSelecter', viewSelecter)
    .directive('coverView', coverView)
    .directive('searchBar', searchBar)
    .directive('listView', listView);
}());


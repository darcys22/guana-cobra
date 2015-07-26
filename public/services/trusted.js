(function () {

  var injectParams = ['$sce'];

  var trusted = function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  };

  trusted.$inject = injectParams;

  angular.module('myApp').filter('trusted', trusted);
}());


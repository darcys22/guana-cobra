(function () {

  var injectParams = ['$http', '$q', '$filter'];

  var bookService = function ($http, $q, $filter) {
    return {

      getTopBooks: function() {
        var deferred = $q.defer();
        $http.get('/api/top')
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });
          return deferred.promise;
        },

      getMyBooks: function() {
        var deferred = $q.defer();
        $http.get('/api/top')
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });
          return deferred.promise;
        },

      searchBooks: function(query) {
        var deferred = $q.defer();
        $http.get('/api/top')
          .success(function(data) {
            deferred.resolve($filter('limitTo')(data, 5, Math.random() * data.length));
          }).error(function(data) {
            deferred.reject(data);
          });
          return deferred.promise;
        }

      }
    };


  bookService.$inject = injectParams;

  angular.module('myApp').factory('bookService', bookService);
}());


    //var doRequest = function(username, path) {
      //return $http({
        //method: 'JSONP',
        //url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
      //});
    //}
    //return {
      //events: function(username) { return doRequest(username, 'events'); },
    //};

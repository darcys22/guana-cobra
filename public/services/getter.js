(function () {

  var injectParams = ['$http', '$q', '$filter'];

  var bookService = function ($http, $q, $filter) {
    var funcs = {
      apiTop: function() { $http.get('/api/top') },
      getBooks: function() { $http.get('/api/users/' + userId + '/books') },
      addBooks: function() {
        $http.post('/api/users/' + userId + '/books',
            {'bookId': bookId})
      },
      deleteBooks: function() { $http.delete('/api/users/' + userId + '/books/' + bookId) },
      searchBooks: function() { $http.post('/api/search', JSON.stringify({'Keywords': query})) }
    }

    var deferredbullshit = function(theFunctionActuallyWantingToCall) {
      var deferred = $q.defer();
      funcs[theFunctionActuallyWantingToCall]
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });
      return deferred.promise;
    }

    return {
      getTopBooks: deferredbullshit('apiTop'),
      getMyBooks: deferredbullshit('getBooks'),
      addBookToUser: deferredbullshit('addBooks'),
      deleteBookFromUser: deferredbullshit('deleteBooks'),
      searchBooks: deferredbullshit('searchBooks')
    };
  };


  bookService.$inject = injectParams;

  angular.module('myApp').factory('bookService', bookService);
}());

(function () {

  var injectParams = ['$http', '$q', '$filter'];

  var bookService = function ($http, $q, $filter) {
    var funcs = {
      apiTop: function() { $http.get('/api/top') },
      getBooks: function(userId) { $http.get('/api/users/' + userId + '/books') },
      addBooks: function(userId, bookId) { 
        $http.post('/api/users/' + userId + '/books',
            {'bookId': bookId})
      },
      deleteBooks: function(userId, bookId) { $http.delete('/api/users/' + userId + '/books/' + bookId) },
      addEmail: function(userId, email) { $http.post('/api/users/' + userId + '/email/', {'email': email} ) },
      recoverBooks: function(email) { $http.post('/api/recover/', {'email': email}) },
      searchBooks: function(query) { $http.post('/api/search', JSON.stringify({'Keywords': query})) }
    };

    var deferredbullshit = function() {
      var theFunction = arguments[0];
      var args = Array.prototype.slice.call(arguments).pop();

      var deferred = $q.defer();
      funcs[theFunction].apply(this, args)
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });
      return deferred.promise;
    };

    return {
      getTopBooks: function() { deferredbullshit('apiTop') },
      getMyBooks: function() { deferredbullshit('getBooks', arguments) },
      addBookToUser: function() { deferredbullshit('addBooks', arguments) },
      deleteBookFromUser: function() { deferredbullshit('deleteBooks', arguments) },
      searchBooks: function() { deferredbullshit('searchBooks', arguments) }
    };
  };


  bookService.$inject = injectParams;

  angular.module('myApp').factory('bookService', bookService);
}());

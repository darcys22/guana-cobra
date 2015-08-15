(function () {

  var injectParams = ['$http', '$q', '$filter'];


  var bookService = function ($http, $q, $filter) {

    var deferredbullshit = function(f) {
      return function() {
        var deferred = $q.defer();
        f.apply(this, arguments)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };


    return {

      getTopBooks: deferredbullshit(function() { return $http.get('/api/top') }),

      getMyBooks: deferredbullshit(function(userId) { return $http.get('/api/users/' + userId + '/books') }),
      
      addBookToUser: deferredbullshit(function(userId, bookId) { 
        return $http.post('/api/users/' + userId + '/books',
            {'bookId': bookId})
      }),

      deleteBookFromUser: deferredbullshit(function(userId, bookId) { 
        return $http.delete('/api/users/' + userId + '/books/' + bookId)
      }),

      addEmail: deferredbullshit(function(userId, email) { 
        return $http.post('/api/users/' + userId + '/email/', {'email': email} ) 
      }),

      recoverBooks: deferredbullshit(function(email) { return $http.post('/api/recover/', {'email': email}) }),

      searchBooks: deferredbullshit(function(query) { 
        return $http.post('/api/search', JSON.stringify({'Keywords': query}))
      })

    };
  };

  bookService.$inject = injectParams;

  angular.module('myApp').factory('bookService', bookService);
}());


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

    var funcs = {
      apiTop: deferredbullshit(function() { $http.get('/api/top') }),
      getBooks: deferredbullshit(function(userId) { $http.get('/api/users/' + userId + '/books') }),
      addBooks: deferredbullshit(function(userId, bookId) { 
        $http.post('/api/users/' + userId + '/books',
            {'bookId': bookId})
      }),
      deleteBooks: deferredbullshit(function(userId, bookId) { $http.delete('/api/users/' + userId + '/books/' + bookId) }),
      addEmail: deferredbullshit(function(userId, email) { $http.post('/api/users/' + userId + '/email/', {'email': email} ) }),
      recoverBooks: deferredbullshit(function(email) { $http.post('/api/recover/', {'email': email}) }),
      searchBooks: deferredbullshit(function(query) { $http.post('/api/search', JSON.stringify({'Keywords': query})) })
    };


    return {
      getTopBooks: funcs.apiTop,
      getMyBooks: funcs.getBooks,
      addBookToUser: funcs.addBooks,
      deleteBookFromUser: funcs.deleteBooks,
      searchBooks: funcs.searchBooks 
    };
  };


  bookService.$inject = injectParams;

  angular.module('myApp').factory('bookService', bookService);
}());


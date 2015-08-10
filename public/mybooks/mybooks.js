(function () {
  
  var injectParams = ['$scope', '$rootScope', '$timeout', '$window', 'controllerService', 'bookService'];

  var MybooksController = function($scope, $rootScope, $timeout, $window, controllerService, bookService) {

    controllerService($scope);

    // The books themselves
    $scope.books = []
    $scope.loading = true;

    $scope.books = bookService.getMyBooks($rootScope.userId);
    $scope.books.then(function (books) {
      $scope.loading = false;
      $scope.books = books;
    }, function (status) {
      console.log(status);
    });

    $scope.pageMessage = false;
    function clearMessage() {
      $scope.pageMessage = false;
    };

    $scope.addBook = function(bookID) {
      $scope.pageMessage = 'Saving Book';
      $scope.query = '';
      $scope.focus = false;
      $scope.searchResults = [];
      $scope.searchReturn = false;
      var newBook = bookService.addBookToUser($rootScope.userId, bookID);
      newBook.then(function (res) {
        $scope.pageMessage = 'Book added Successfully!';
        $scope.books = res;
        $timeout(clearMessage, 2000);
      }, function (status) {
        $scope.pageMessage = status;
        $timeout(clearMessage, 2000);
      });
    };

    $scope.deleteBook = function(bookID) {
      $scope.pageMessage = 'Deleting Book';
      var newBook = bookService.deleteBookFromUser($rootScope.userId, bookID);
      newBook.then(function (res) {
        $scope.pageMessage = 'Book deleted Successfully!';
        $scope.books = res;
        $timeout(clearMessage, 2000);
      }, function (status) {
        $scope.pageMessage = status;
        $timeout(clearMessage, 2000);
      });
    };

    $scope.query = '';
    $scope.focus = false;
    $scope.searching = false;

    var findBooks = function(value) {
      $scope.searchResults = bookService.searchBooks(value);
      $scope.searching = true;
      $scope.searchResults.then(function (books) {
        $scope.searchResults = JSON.parse(books);
        $scope.searching = false;
        $scope.searchReturn = true;
      }, function (status) {
        $scope.pageMessage = status;
        $timeout(clearMessage, 2000);
        $scope.searching = false;
        $scope.searchReturn = false;
      });
    };

  var _timeout;

  $scope.inputFocus = function () {
    $timeout(function() {
      var element = $window.document.getElementById('search-input');
      if (element)
        element.focus();
    });
  };

  $scope.removeSearch = function () {
    $scope.query = '';
    $scope.searchChanged($scope.query);
  };

  $scope.searchChanged = function (searchQuery) {
    if(_timeout){ //if there is already a timeout in process cancel it
      $timeout.cancel(_timeout);
    }
    if (searchQuery) {
      _timeout = $timeout(function(){
        findBooks(searchQuery);
        _timeout = null;
      },800);
    } else {
      $scope.searching = false;
      $scope.searchReturn = false;
      $scope.searchResults = false;
    }
  };
      

  };

  MybooksController.$inject = injectParams;

  angular.module('myApp.mybooks', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/mybooks', {
              templateUrl: 'mybooks/mybooks.html',
              controller: 'MybooksController'
            });
    }])

    .controller('MybooksController', MybooksController);

  })
();


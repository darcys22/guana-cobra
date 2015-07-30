(function () {
  
  var injectParams = ['$scope', '$rootScope', '$timeout', 'controllerService', 'bookService'];

  var MybooksController = function($scope, $rootScope, $timeout, controllerService, bookService) {

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
      var newBook = bookService.addBookToUser($rootScope.userId, bookID);
      newBook.then(function (res) {
        $scope.query = {};
        $scope.focus = false;
        $scope.searchResults = [];
        $scope.searchReturn = false;
        $scope.pageMessage = 'Book added Successfully!';
        //$scope.books = res;
        $timeout(clearMessage, 3000);
      }, function (status) {
        $scope.pageMessage = status;
        $timeout(clearMessage, 3000);
      });
    };

    $scope.availableSearchParams = [
      { key: "Title", name: "Title", placeholder: "Title..." },
      { key: "Author", name: "Author", placeholder: "Author..." },
    ];

    $scope.doBlur = function() {
      console.log('blur');
    };

    $scope.query = {};
    $scope.focus = false;

    var validSearch = function (searchObject) {
      return (searchObject.query || searchObject.title || searchObject.author) ? true : false
    };

    $scope.$watch('focus', function(value) {
      if (!value && !validSearch($scope.query)) {
        $scope.searchReturn = false;
      }
    });

    $scope.$watch('query', function(value) {
      if (validSearch(value)) {
          $scope.searchResults = bookService.searchBooks(value);
          $scope.searchResults.then(function (books) {
            $scope.searchResults = JSON.parse(books);
            $scope.searchReturn = true;
            $scope.focus = false;
          }, function (status) {
            console.log(status);
          });
      }
    }, true);
      

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


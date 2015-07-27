(function () {
  
  var injectParams = ['$scope', '$rootScope', 'controllerService', 'bookService'];

  var MybooksController = function($scope, $rootScope, controllerService, bookService) {

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

    $scope.addBook = function(bookID) {
      var newBook = bookService.addBookToUser($rootScope.userId, bookID);
      newBook.then(function (res) {
        $scope.query = {};
        $scope.focus = false;
      }, function (status) {
        $scope.pageMessage = status;
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


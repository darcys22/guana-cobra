(function () {
  
  var injectParams = ['$scope', '$rootScope', 'controllerService', 'bookService'];

  var MybooksController = function($scope, $rootScope, controllerService, bookService) {

    controllerService($scope);

    // The books themselves
    $scope.books = []
    $scope.loading = true;

    $scope.$watch ($rootScope.cookieReady,
      function(newVal) {
        if (newVal) {
          $scope.$apply(function () {
            $scope.books = bookService.getMyBooks($rootScope.userid);
            $scope.books.then(function (books) {
              $scope.loading = false;
              $scope.books = books;
            }, function (status) {
              console.log(status);
            });
          })
        }
      }
    );


    $scope.availableSearchParams = [
      { key: "title", name: "Title", placeholder: "Title..." },
      { key: "author", name: "Author", placeholder: "Author..." },
    ];

    $scope.doBlur = function() {
      console.log('blur');
    };

    $scope.query = {};
    $scope.focus = false;

    var validSearch = function (searchObject) {

      return (searchObject.query || searchObject.title || searchObject.author) ? true : false
      //if (searchObject.query || searchObject.title || searchObject.author) { 
        //console.log('TRUE');
        //return true
      //} else {
        //console.log('FALSE');
        //console.log(searchObject);
        //return false
      //}
    };

    $scope.$watch('focus', function(value) {
      //TODO MAKE THIS WORK
      if (!value && !validSearch($scope.query)) {
        $scope.searchReturn = false;
      }
    });

    $scope.$watch('query', function(value) {
      if (validSearch(value)) {
          $scope.searchResults = bookService.searchBooks(value);
          $scope.searchResults.then(function (books) {
            $scope.searchResults = books;
            $scope.searchReturn = true;
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


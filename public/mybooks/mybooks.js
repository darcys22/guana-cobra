(function () {

  var injectParams = ['$scope', 'controllerService', 'bookService'];

  var MybooksController = function($scope, controllerService, bookService) {

    $scope.userid = "c4ca4238a0b923820dcc509a6f75849b";

    //try {
      var ec = new evercookie();
      //ec.set("id", "12345");
      ec.get("id", function(value) { alert("Cookie value is " + value) });
    //} catch(e) {};

    controllerService($scope);

    // The books themselves

    $scope.books = bookService.getMyBooks();
    $scope.books.then(function (books) {
      $scope.books = books;
    }, function (status) {
      console.log(status);
    });

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


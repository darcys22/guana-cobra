(function () {

  var injectParams = ['$scope', 'controllerService', 'bookService'];

  var HordemindController = function($scope, controllerService, bookService) {

    controllerService($scope);

    // The books themselves

    $scope.books = bookService.getTopBooks();
    $scope.books.then(function (books) {
      $scope.books = books;
    }, function (status) {
      console.log(status);
    });

  };

  HordemindController.$inject = injectParams;

  angular.module('myApp.hordemind', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/hordemind', {
              templateUrl: 'hordemind/hordemind.html',
              controller: 'HordemindController'
            });
    }])

    .controller('HordemindController', HordemindController);

  })
();



//At this point the customeredit controller is just something to copy shit from
  //var CustomerEditController = function ($scope, $location, $routeParams,
      //$timeout, config, dataService, modalService) {
        //var vm = this,
        //customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0,
        //timer,
        //onRouteChangeOff;
        //vm.customer = {};
        //vm.states = [];
        //vm.title = (customerId > 0) ? 'Edit' : 'Add';
        //vm.buttonText = (customerId > 0) ? 'Update' : 'Add';
        //vm.updateStatus = false;
        //vm.errorMessage = '';
        //vm.isStateSelected = function (customerStateId, stateId) {
          //return customerStateId === stateId;
        //};
        //vm.saveCustomer = function () {
          //if ($scope.editForm.$valid) {
            //if (!vm.customer.id) {
              //dataService.insertCustomer(vm.customer).then(processSuccess, processError);
            //}
            //else {
              //dataService.updateCustomer(vm.customer).then(processSuccess, processError);
            //}
          //}
        //};
      //};
//Ends Here

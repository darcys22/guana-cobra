(function () {

  var injectParams = ['$scope', '$rootScope', '$modal', '$log', '$cookies', 'bookService'];

  var modal = function ($scope, $rootScope, $modal, $log, $cookies, bookService) {

    var content = {
      recover: {
        title   : 'Recover Your Books',
        content : 'Something Something Dark Side',
        result  : function (email) {
          var cookie = bookService.recoverBooks(email);
          cookie.then(
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 365 * 10);
            $cookies.put('current.user', cookie, {'expires': expireDate})
          )
        }
      },
      addEmail: {
        title   : 'Add Your Email',
        content : 'Something Something Dark Side',
        result  : function (email) {
          bookService.addEmail($rootScope.userId, email);
        }
      }
    };

    $scope.email = '';

    $scope.animationsEnabled = true;

    $scope.open = function (direction) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/../partials/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          contents: function () {
            return content[direction];
          }
        }
      });

      modalInstance.result.then(content[direction].result);
    };
    
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  };

  modal.$inject = injectParams;
  angular.module('myApp').controller('modalCtrl', modal);




  var instanceInjectParams = [ '$scope', '$modalInstance', 'contents'];
  var modalInstance = function ($scope, $modalInstance, contents) {

    $scope.content = contents;

    $scope.ok = function () {
      $modalInstance.close($scope.email);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  modalInstance.$inject = instanceInjectParams;
  angular.module('myApp').controller('ModalInstanceCtrl', modalInstance);

}());


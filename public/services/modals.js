(function () {

  var injectParams = ['$scope', '$modal', '$log'];

  var modal = function ($scope, $modal, $log) {

    var content = {
      'recover': {
        'title'   : 'Recover Your Books',
        'content' : 'Something Something Dark Side;
      },
      'addEmail': {
        'title'   : 'Add Your Email',
        'content' : 'Something Something Dark Side;
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
          content: function () {
            return content[direction]
          }
        }
      });

      modalInstance.result.then(function (email) {
        console.log(email);
      });
    };
    
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  };

  modal.$inject = injectParams;
  angular.module('myApp').controller('modalCtrl', modal);




  var instanceInjectParams = [ '$scope', '$modalInstance'];
  var modalInstance = function ($scope, $modalInstance) {

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


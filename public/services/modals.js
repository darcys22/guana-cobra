(function () {

  var injectParams = ['$scope', '$modal', '$log'];

  var modal = function ($scope, $modal, $log) {

    $scope.email = '';

    $scope.animationsEnabled = true;

    $scope.openRecovery = function () {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/../partials/recoverModal.html',
        controller: 'ModalInstanceCtrl'
        }
      });

      modalInstance.result.then(function (email) {
        console.log(email);
      });
    };
    
    $scope.openNewEmail = function () {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/../partials/newEmailModal.html',
        controller: 'ModalInstanceCtrl'
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

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


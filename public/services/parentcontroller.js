(function () {

    function controllerService() {
      return ctrlService;
    }

    function ctrlService(scope) {

      //List or Cover variables and functions

      scope.orderby = 'id';
      scope.reverse = false;

      scope.listDisplayModeEnabled = false;
      scope.DisplayModeEnum = {
        Cover: 0,
        List: 1
       };

      scope.changeDisplayMode = function (displayMode) {
        switch (displayMode) {
          case scope.DisplayModeEnum.Cover:
            scope.listDisplayModeEnabled = false;
            break;
          case scope.DisplayModeEnum.List:
            scope.listDisplayModeEnabled = true;
            break;
        }
      };

      scope.setOrder = function (orderby) {
        if (orderby === scope.orderby) {
          scope.reverse = !scope.reverse;
        }
        scope.orderby = orderby;
      };
    }


angular.module('myApp').factory('controllerService', controllerService);

}());


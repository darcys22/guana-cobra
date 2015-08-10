(function () {

  var injectParams = [];

  var orientable = function () {
    return {
      link: function(scope, element, attrs) {

        element.bind("load", function(e){
          if(this.width > this.height) {
            img.width = '100%';
            img.height = 'auto';
          }
        });
      }
    };
  };

  orientable.$inject = injectParams;

  angular.module('myApp').directive('orientable', orientable);
}());


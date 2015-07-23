(function () {

  var injectParams = ['$ngCookie'];

  var cookieService = function ($cookies) {
    return {

      newCookie: function() {
        var cookie = ("" + Date.now + Math.random()*50);
        $cookies.put('current.user', cookie)
        return cookie;
      }

    }
  };


  cookieService.$inject = injectParams;

  angular.module('myApp').factory('cookieService', cookieService);
}());

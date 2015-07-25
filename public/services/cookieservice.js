(function () {

  var injectParams = ['$cookies'];

  var cookieService = function ($cookies) {
    return {

      newCookie: function() {
        var cookie = ("" + Date.now() + Math.floor(Math.random()*5000));
        $cookies.put('current.user', cookie)
        return cookie;
      }

    }
  };


  cookieService.$inject = injectParams;

  angular.module('myApp').

    factory('cookieService', cookieService);

}());
//(function () {

  //var injectParams = ['$ngCookie'];

  //var cookieService = function ($cookies) {
    //return {

      //newCookie: function() {
        //var cookie = ("" + Date.now() + Math.floor(Math.random()*50));
        //$cookies.put('current.user', cookie)
        //return cookie;
      //}

    //}
  //};


  //cookieService.$inject = injectParams;

  //angular.module('myApp').

    //provider('cookieService', function cookieServiceProvider() {
      //this.$get= function cookieServiceFactory() {
        //return new cookieService();
      //}
    //});

//}());

(function(){
  'use strict'

  angular.module('my.history')
         .service('myHistoryHttp', myHistoryHttp);

  //////////////////////

  myHistoryHttp.$inject = ['$http'];
  function myHistoryHttp ($http)
  {
    const vm = this;

    vm.http = $http;
    vm.service = {
      getMovieHisoty: getMovieHisoty,
    };

    return vm.service;

    //////////////////////

    function getMovieHisoty(){
      var endpoint = '/get-history';
      return vm.http.get(endpoint);
    }
  }
})();

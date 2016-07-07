(function(){
  'use strict'

  angular.module('my.movies')
         .service('myMoviesHttp', myMoviesHttp);

  //////////////////////

  myMoviesHttp.$inject = ['$http'];
  function myMoviesHttp ($http)
  {
    const vm = this;

    vm.http = $http;
    vm.service = {
      getMoviesList: getMoviesList,
      saveHistory  : saveHistory,
    };

    return vm.service;

    //////////////////////

    function getMoviesList(movie){
      var endpoint = 'https://demo2697834.mockable.io/movies';
      return vm.http.get(endpoint);
    }

    function saveHistory(movie){
      var endpoint = '/save-history';
      return vm.http.post(endpoint, {params: movie});
    }
  }
})();

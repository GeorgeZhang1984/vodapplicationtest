(function(){
  'use strict'

  var myMoviesListComponent =
  {
    templateUrl : 'component/my-movies-list/movies-list.component.html',
    controller  :  myMoviesListCtrl,
    controllerAs: 'myMoviesListCtrl',
    bindings    : {}
  };

  angular.module('my.movies')
         .component('myMoviesList', myMoviesListComponent);

  //////////////////////

  myMoviesListCtrl.$inject = ['myMoviesHttp', '$scope'];
  function myMoviesListCtrl(myMoviesHttp, $scope)
  {
    const vm = this;
    const VIDEO_TAG_ID = 'video_play_modal_html5_api';
    const SOURCE_TAG_ID = 'video_source_mp4';

    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;
    const KEY_ENTER = 13;

    vm.$onInit = init;

    // accessable variables
    vm.moviesList = [];
    vm.moviesCount = 0;
    vm.currentMovieIndex = 0;
    vm.playingMovie = {};
    vm.onNav = false;

    // accessable functions
    vm.playMovie = playMovie;
    vm.stopPlayMovie = stopPlayMovie;
    vm.keyNavigation = keyNavigation;
    vm.mouseNavigation = mouseNavigation;

    //////////////////////

    /*
     * @ng-type: function
     * @ng-description:
     * get movies when loading
     */
    function init(){
      myMoviesHttp.getMoviesList().then(function(res){
        vm.moviesList = res.data.entries;
        vm.moviesCount = res.data.totalCount;

        // parse publish date
        angular.forEach(vm.moviesList, function(movie, index){
          vm.moviesList[index].publishedUTCDate = _convertSecondsToUTC(movie.publishedDate);
        });
      });

      $('body').keydown(function(e){
        $scope.$apply(keyNavigation(e.keyCode));
      });
    }

    /*
     * @ng-type: function
     * @ng-description:
     * control list navigation by mouse
     */
    function mouseNavigation(index){
      console.log('aa');
      vm.moviesList[vm.currentMovieIndex].selected = false;
      vm.currentMovieIndex =  index;
      vm.moviesList[vm.currentMovieIndex].selected = true;
    }

    /*
     * @ng-type: function
     * @ng-description:
     * control list navigation by left and right arrow keys
     */
    function keyNavigation(keyCode){
      if (vm.moviesList[vm.currentMovieIndex]){
        vm.moviesList[vm.currentMovieIndex].selected = false;
      }

      if (keyCode === KEY_LEFT){
        vm.currentMovieIndex -= 1;
      } else if (keyCode === KEY_RIGHT){
        vm.currentMovieIndex += 1;
      } else if (keyCode === KEY_ENTER){
        vm.playMovie(vm.moviesList[vm.currentMovieIndex]);
      }

      if (vm.currentMovieIndex < 0 ) {
        vm.currentMovieIndex = 0;
      } else if (vm.currentMovieIndex > vm.moviesList.length){
        vm.currentMovieIndex = vm.moviesList.length;
      }

      movePositionOfDiv(vm.currentMovieIndex, keyCode);
      vm.moviesList[vm.currentMovieIndex].selected = true;
    }

    function movePositionOfDiv(index, keyCode){
      var carWidth = document.getElementsByClassName('col-xs-2')[0].offsetWidth;
      var currentWindow = carWidth * index;

      $('#movies-list').scrollLeft(currentWindow - carWidth);
    }
    /*
     * @ng-type: internal function
     * @ng-description:
     * convert seconds to UTC date object
     */
    function _convertSecondsToUTC(utcSeconds){
      var d = new Date(0);
      d.setUTCSeconds(utcSeconds/1000);

      return d;
    }

    /*
     * @ng-type: stopPlayMovie
     * @ng-description:
     * stop play current playing movie
     */
    function stopPlayMovie(){
      var video = document.getElementById(VIDEO_TAG_ID);
      video.pause();
      video.currentTime = 0;


      $('#'+SOURCE_TAG_ID).remove();
    }

    /*
     * @ng-type: playMovie
     * @ng-description:
     * playing selected movie
     */
    function playMovie(movie){
      vm.playingMovie = movie;

      // save watch history
      myMoviesHttp.saveHistory(movie);

      // insert source
      var video = $('#'+VIDEO_TAG_ID);
      var source = $('<source/>', {
        id   : SOURCE_TAG_ID,
        src  : movie.contents[0].url,
        type : 'video/' + movie.contents[0].format
      }).appendTo(video);

      // start modal
      $('.ui.basic.modal').modal('setting', {
        onHidden: stopPlayMovie,
      }).modal('show');
    }
  }
})();

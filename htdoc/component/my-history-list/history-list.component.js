(function(){
  'use strict'

  var myHistoryListComponent =
  {
    templateUrl : 'component/my-history-list/history-list.component.html',
    controller  :  myHistoryListCtrl,
    controllerAs: 'myHistoryListCtrl',
    bindings    : {}
  };

  angular.module('my.history')
         .component('myHistoryList', myHistoryListComponent);

  //////////////////////

  myHistoryListCtrl.$inject = ['myHistoryHttp'];
  function myHistoryListCtrl(myHistoryHttp)
  {
    const vm = this;

    vm.$onInit = init;
    vm.histories = [];

    //////////////////////

    /*
     * @ng-type: function
     * @ng-description:
     * get watching history
     */
    function init(){
      myHistoryHttp.getMovieHisoty().then(function(res){
        vm.histories = res.data;
      });
    }
  }
})();

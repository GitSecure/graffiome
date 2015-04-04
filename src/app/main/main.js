(function() {
  'use strict';
  var main = angular.module('graffio.mainController', []);

  main.controller('mainController', function($scope, $state, mainFactory) {
    var ref = new Firebase('https://radiant-heat-919.firebaseio.com');
    $scope.logout = mainFactory.logout.bind(this, ref, $state);
    mainFactory.getStatus(function(status, tabID) {
      if (status.switch === 'on') $state.go('draw');
    });
    $scope.draw = function(){
      $state.go('draw');
    }
  });

  main.controller('onOffController', function($scope, mainFactory){
    $scope.onOffButtonTxt = 'loading...';
    $scope.toggleStatus = mainFactory.toggleStatus.bind(this, status, $scope);
    mainFactory.getStatus(function(status) {
      mainFactory.setStatusUi(status, $scope);
    });
  });
})();

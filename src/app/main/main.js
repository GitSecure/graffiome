'use strict';
angular.module('graffio.mainController', [])
.controller('mainController', function($scope, $state, mainFactory) {
  var ref = new Firebase('https://radiant-heat-919.firebaseio.com');

  $scope.logout = mainFactory.logout.bind(this, ref, $state);

  mainFactory.getStatus(function(status, tabID) {
    if (status.switch === 'on') $state.go('draw');
  });

  $scope.draw = function(){
    $state.go('draw');
  }

}).controller('onOffController', function($scope, mainFactory){
  $scope.onOffButtonTxt = 'loading...';

  $scope.toggleStatus = function() {
    mainFactory.getStatus(function(status, tabID) {
      mainFactory.sendTabMessage(status, tabID);
      if (status === 'off') {
        mainFactory.setStatusUi('on', $scope);
      } else {
        mainFactorysetStatusUi('off', $scope);
      }
    });
  };

  mainFactory.getStatus(function(status) {
    mainFactory.setStatusUi(status, $scope);
  });
})

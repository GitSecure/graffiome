'use strict';
angular.module('graffio.drawController', [
    'ui.slider',
    'nya.bootstrap.select'
])
.controller('drawController', function($scope, $state, mainFactory) {
  $scope.brush = "Paint";
  $scope.thickness = 1;
  $scope.end = function(){
    $state.go('main');
  }

  mainFactory.getStatus(function(status, tabID) {
    if (status.switch === 'off') $state.go('main');
    setStatusUi(status);
  });

  var setStatusUi = function(status) {
    $scope.$apply(function() {
      $scope.brush = status.brush;
      $scope.color = status.color;
      $scope.thickness = status.width;
    });
  };

  $scope.toggleStatus = function() {
    mainFactory.getStatus(function(status, tabID) {
      mainFactory.sendTabMessage(status, tabID);
    });
  };

  $scope.brushSelect = function(event, brush){
    mainFactory.getCurrentTabID(function(activeTab){
      chrome.tabs.sendMessage(activeTab, {brushSelect: brush});
    });
  };

  $scope.changeWidth = function(event, thickness){
    mainFactory.getCurrentTabID(function(activeTab){
      chrome.tabs.sendMessage(activeTab, {changeWidth: thickness});
    });
  };

  $scope.changeColor = function(event, color){
    mainFactory.getCurrentTabID(function(activeTab){
      chrome.tabs.sendMessage(activeTab, {changeColor: color});
    });
  };
});

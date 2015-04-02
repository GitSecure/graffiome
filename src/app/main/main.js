'use strict';

var getCurrentTabID = function(callback) {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var currentTabId = tabs[0].id;
    callback(currentTabId);
  });
};

var getStatus = function(callback) {
  getCurrentTabID(function(tabID) {
    chrome.tabs.sendMessage(tabID, {getStatus: true}, function(res) {
      callback(res.status, tabID);
    });
  });
};

var sendTabMessage = function(status, tabID) {
 var msg;
 if (status.switch === 'off') {
   msg = 'on';
 } else {
   msg = 'off';
 }

 chrome.tabs.sendMessage(tabID, {toggle: msg}, function(res){

 });
};

angular.module('graffio.mainController', [])
.controller('mainController', function($scope, $state, mainFactory) {
  var ref = new Firebase('https://radiant-heat-919.firebaseio.com');


  getStatus(function(status, tabID) {
    if (status.switch === 'on') {
      $state.go('draw');
    }
  });

  $scope.draw = function(){
    $state.go('draw');
  }

  $scope.logout = function() {
    ref.unauth();
    chrome.runtime.sendMessage({action: 'clearToken'});
    $state.go('login');
  };
}).controller('onOffController', function($scope){ 
  $scope.onOffButtonTxt = 'loading...';

  var setStatusUi = function(status) {
    $scope.$apply(function() {
      if (status === 'off') {
        $scope.onOffButtonTxt = 'On';
      } else {
        $scope.onOffButtonTxt = 'Off';
      }
    });
  };

  $scope.toggleStatus = function() {
    getStatus(function(status, tabID) {
      sendTabMessage(status, tabID);
      if (status === 'off') {
        setStatusUi('on');  
      } else {
        setStatusUi('off');
      }
    });
  };
 
  getStatus(function(status) {
    setStatusUi(status);
  });
})

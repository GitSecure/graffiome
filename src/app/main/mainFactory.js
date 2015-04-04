(function() {
  'strict';
  angular.module('graffio.mainFactory', []).factory('mainFactory', function() {
    var factory = {};

    factory.getCurrentTabID = function(callback) {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var currentTabId = tabs[0].id;
        callback(currentTabId);
      });
    };

    factory.getStatus = function(callback) {
      factory.getCurrentTabID(function(tabID) {
        chrome.tabs.sendMessage(tabID, {getStatus: true}, function(res) {
          callback(res.status, tabID);
        });
      });
    };

    factory.sendTabMessage = function(status, tabID) {
      var msg;
      if (status.switch === 'off') {
        msg = 'on';
      } else {
        msg = 'off';
      }
      chrome.tabs.sendMessage(tabID, {toggle: msg}, function(res){
      });
    };

    factory.logout = function(ref, state) {
      ref.unauth();
      chrome.runtime.sendMessage({action: 'clearToken'});
      state.go('login');
    };

    factory.setStatusUi = function(status, scope) {
      scope.$apply(function() {
        if (status === 'off') {
          scope.onOffButtonTxt = 'On';
        } else {
          scope.onOffButtonTxt = 'Off';
        }
      });
    };

    factory.toggleStatus = function(status, scope) {
      factory.getStatus(function(status, tabID) {
        factory.sendTabMessage(status, tabID);
        if (status === 'off') {
          factory.setStatusUi('on', scope);
        } else {
          factory.setStatusUi('off', scope);
        }
      });
    };

    return factory;
  });
})();

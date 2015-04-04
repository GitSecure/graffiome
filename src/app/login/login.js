(function() {
  'use strict';
  angular.module('graffio.loginController', [])
  .controller('loginController', function($scope, $state, authFactory) {
    var ref = new Firebase('https://radiant-heat-919.firebaseio.com');
    $scope.logIn = authFactory.logIn.bind(this, ref, $scope, $state);
  });
})();

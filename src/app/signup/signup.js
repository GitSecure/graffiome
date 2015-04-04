(function() {
  'use strict';
  angular.module('graffio.signupController', [])
  .controller('signupController', function($scope, $state, authFactory) {
    var ref = new Firebase('https://radiant-heat-919.firebaseio.com/');
    $scope.signUp = authFactory.signUp.bind(this, ref, $scope, $state);
  });
})();


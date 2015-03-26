'use strict';
var app = angular.module('graffio', [
  'graffio.signupController',
  'graffio.loginController',
  'graffio.mainController',
  'graffio.drawController',
  'colorpicker.module',
  'ui.bootstrap',
  'ui.router'
]);




app.config(function($stateProvider, $urlRouterProvider) {
  var rootRef = new Firebase('https://radiant-heat-919.firebaseio.com/web/uauth');
  var user = rootRef.getAuth();
  if (!user) {
    $urlRouterProvider.otherwise('/login');
  } else {
    chrome.runtime.sendMessage({"action": 'getDrawingStatus'}, "lol bbq brit", function(response){
      console.log("I DONT CARE! I LOVE IT ",response);
      if (response.drawingState === true){
        $urlRouterProvider.otherwise('/draw');
      } else {
        $urlRouterProvider.otherwise('/main');
      }
    });
  }

  // Now set up the states
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'signupController',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'loginController'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'main/main.html',
      controller: 'mainController'
    })
    .state('draw', {
      url: '/draw',
      templateUrl: 'draw/draw.html',
      controller: 'drawController'
    });
});
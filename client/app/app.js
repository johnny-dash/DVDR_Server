'use strict';

angular.module('webdemoApp', ['webdemoApp.auth', 'webdemoApp.admin', 'webdemoApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match','ngMaterial'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/mqtt');

    $locationProvider.html5Mode(true);
  });

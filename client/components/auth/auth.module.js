'use strict';

angular.module('webdemoApp.auth', ['webdemoApp.constants', 'webdemoApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

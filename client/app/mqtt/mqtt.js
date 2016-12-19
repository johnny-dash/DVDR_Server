'use strict';

angular.module('webdemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mqtt', {
        url: '/mqtt',
        template: '<mqtt></mqtt>'
      });
  });

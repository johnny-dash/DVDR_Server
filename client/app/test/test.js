'use strict';

angular.module('webdemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        template: '<test></test>'
      });
  });

'use strict';

angular.module('webdemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('task', {
        url: '/mqtt/task',
        template: '<task></task>'
      });
  });

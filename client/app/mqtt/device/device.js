'use strict';

angular.module('webdemoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('device', {
        url: '/mqtt/device',
        template: '<device></device>'
      });
  });

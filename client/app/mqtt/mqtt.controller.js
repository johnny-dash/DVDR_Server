'use strict';

(function(){

class MqttComponent {
  constructor($http, socket) {
    this.sensorData = [];
    this.socket = socket;
    this.$http = $http;

  }

	$onInit() {
    let _this = this;
    this.socket.socket.on('updates', function (message) {
      _this.sensorData.push(message);
    });
	}

  clean() {
    sensorData = [];
  }
}

angular.module('webdemoApp')
  .component('mqtt', {
    templateUrl: 'app/mqtt/mqtt.html',
    controller: MqttComponent,
    controllerAs: 'mqttCtrl'
  });

})();

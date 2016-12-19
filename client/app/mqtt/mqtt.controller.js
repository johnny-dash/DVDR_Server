'use strict';

(function(){

class MqttComponent {
  constructor($http, socket) {
    this.sensorData = [];
    this.socket = socket;
    this.$http = $http;
  }

	$onInit() {
	  this.$http.get('/api/sensors')
	    .then(response => {
	      this.sensorData = response.data;
	      this.socket.syncUpdates('sensor', this.sensorData);
	    });
	}
}

angular.module('webdemoApp')
  .component('mqtt', {
    templateUrl: 'app/mqtt/mqtt.html',
    controller: MqttComponent,
    controllerAs: 'mqttCtrl'
  });

})();

'use strict';

(function(){

class TaskComponent {
  constructor($mdDialog,$http, socket) {
    this.message = '';
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.socket = socket;
    this.sensorConfigs = [];
  }

  $onInit() {
      this.$http.get('/api/sensorConfigs')
        .then(response => {
          this.sensorConfigs = response.data;
          this.socket.syncUpdates('sensorConfig', this.sensorConfigs);
        });
  }



  advanceDialog(ev){
    this.$mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/mqtt/task/dialog.addtask.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      controllerAs: 'dialogCtrl'
    })
    .then(function(success) {
      this.message = 'Task has been started.';
    }, function() {
      this.message = 'You cancelled the dialog.';
    });  
  }

  stopTask(sensorConfig){
    this.$http.delete('/api/sensorConfigs/' + sensorConfig._id);
    this.$http.post('/api/mqttPublishs/stop',sensorConfig);
    
  }

}

class DialogController {
    constructor($mdDialog,$http) {
      //initial config
      this.message = '';
      this.$mdDialog = $mdDialog;
      this.$http = $http;

      //this is for picked data
      this.taskname = '';
      this.frequency = '';
      this.selected_Sensor = null;
      this.selected_Device = null;
      this.selected_Port = null;
      
      //this is slots for data
      this.devices = [];
      this.sensors = [
        'air_quality', 
        'temperature_humidity'
      ];
      this.ports = [];

      //get device infor from db
      this.$http.get('/api/devices')
        .then(response => {
          this.devices = response.data;
          this.socket.syncUpdates('device', this.devices);
        });

    }


    addNewTask(){
        var newConfig = {
            task: this.taskname,
            device: this.selected_Device,
            sensor: this.selected_Sensor,
            port: this.selected_Port,
            frequency: this.frequency
        } 
        this.$http.post('/api/sensorConfigs', newConfig); 
        this.$http.post('/api/mqttPublishs', newConfig);
        var updatedDevice = JSON.parse(this.selected_Device);
        for(var i = 0; i < updatedDevice.ports.length; i++){
            if(updatedDevice.ports[i].name == this.selected_Port){
              updatedDevice.ports[i].state = this.selected_Sensor;
            }
        }
        this.$http.put('/api/devices/' + updatedDevice._id, updatedDevice);
        this.$mdDialog.hide();
    }

    select_Device(device){
      this.selected_Device = device;
      this.ports = JSON.parse(device).ports;
    }

    select_Port(port){
      this.selected_Port = port;
    }

    select_Sensor(sensor){
      this.selected_Sensor = sensor;
    }

    cancel() {
      this.$mdDialog.cancel();
    };

}


angular.module('webdemoApp')
  .component('task', {
    templateUrl: 'app/mqtt/task/task.html',
    controller: TaskComponent,
    controllerAs: 'taskCtrl'
  });


})();

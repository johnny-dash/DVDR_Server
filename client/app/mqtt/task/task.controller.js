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

  //create the socket for sensorConfig
  $onInit() {
      this.$http.get('/api/sensorConfigs')
        .then(response => {
          this.sensorConfigs = response.data;
          this.socket.syncUpdates('sensorConfig', this.sensorConfigs);
        });
  }

  //pop up the seting dialog for new task
  setNewTask(ev){
    this.$mdDialog.show({
      controller: AddtskDialogController,
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

  //update selected task
  updateTask(sensorConfig){
    this.$mdDialog.show({
      controller: UpdatetskDialogController,
      templateUrl: 'app/mqtt/task/dialog.updatetask.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true,
      controllerAs: 'dialogCtrl',
      locals : {
          sensorConfig: sensorConfig
      }
    })
  }

  //stop selected task
  stopTask(sensorConfig){
    this.$http.delete('/api/sensorConfigs/' + sensorConfig._id);
    this.$http.post('/api/mqttPublishs/stop',sensorConfig);
    var updatedDevice = JSON.parse(sensorConfig.device);
    for(var i = 0; i < updatedDevice.ports.length; i++){
        if(updatedDevice.ports[i].name == sensorConfig.port){
          updatedDevice.ports[i].state = 'free';
        }
    }
    this.$http.put('/api/devices/' + updatedDevice._id, updatedDevice);      
  }

}


//this is the dialog controller for add task
class AddtskDialogController {
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
        'temperature_humidity',
        'light'
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

class UpdatetskDialogController{
    constructor($mdDialog,$http, sensorConfig){
        this.$mdDialog = $mdDialog;
        this.$http = $http;
        this.task = sensorConfig.task;
        this.frequency = sensorConfig.frequency;
        this.sensorConfig = sensorConfig;
    }

    update() {
        this.sensorConfig.task = this.task;
        this.sensorConfig.frequency = this.frequency;
        this.$http.put('/api/sensorConfigs/' + this.sensorConfig._id, this.sensorConfig);
        this.$http.post('/api/mqttPublishs/update', this.sensorConfig);
        this.$mdDialog.hide();
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

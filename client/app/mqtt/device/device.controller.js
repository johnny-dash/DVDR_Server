'use strict';

(function(){

class DeviceComponent {
  constructor($mdDialog, $http, socket) {
    this.message = '';
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.socket = socket;
    this.devices = [];
  }

  $onInit() {
      this.$http.get('/api/devices')
        .then(response => {
          this.devices = response.data;
          this.socket.syncUpdates('device', this.devices);
        });
  }

  btn_add_Device(ev){
  	this.$mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/mqtt/device/dialog.addDevice.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      controllerAs: 'dialogCtrl'
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  }

  delete_device(device){
      this.$http.delete('/api/devices/' + device._id);
  }
}

class DialogController {
    constructor($mdDialog,$http,$scope) {
      this.message = '';
      this.$mdDialog = $mdDialog;
      this.$http = $http;
      this.devicename = '';
      this.serialnum = '';
    }


    addNewDevice(){
        var newDevice = {
		  name: this.devicename,
		  serial: this.serialnum,
		  ports: [
		  {
		  	name: 'A0',
		  	state: 'free'
		  },
		  {
		  	name: 'A1',
		  	state: 'free'
		  },
		  {
		  	name: 'A2',
		  	state: 'free'
		  },
		  {
		  	name: 'D0',
		  	state: 'free'
		  },
		  {
		  	name: 'D1',
		  	state: 'free'
		  },
		  {
		  	name: 'D2',
		  	state: 'free'
		  },
		  {
		  	name: 'D3',
		  	state: 'free'
		  },
		  {
		  	name: 'D4',
		  	state: 'free'
		  }
		  ]
        }
        this.$http.post('/api/devices', newDevice);
        this.$mdDialog.hide();
    }



    cancel() {
      this.$mdDialog.cancel();
    };
}

angular.module('webdemoApp')
  .component('device', {
    templateUrl: 'app/mqtt/device/device.html',
    controller: DeviceComponent,
    controllerAs: 'deviceCtrl'
  });

})();

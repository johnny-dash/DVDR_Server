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

  addTask(ev){
    let _this = this;
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = this.$mdDialog.prompt()
      .title('How often would you like your sensor to crab data?')
      .textContent('Please enter in the following line.')
      .placeholder('Every second')
      .ariaLabel('Dog name')
      .initialValue('2')
      .targetEvent(ev)
      .ok('Start!')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(function(result) {
      //this condition is used to check the frequency is not empty
      if(result != ''){
        //initial new config
        var newConfig = {
            task: 'test1',
            sensor: 'air_quality',
            port: 'A0',
            frequency: result,
            active: true
        }
        _this.$http.post('/api/sensorConfigs', newConfig);
        _this.message = 'You decided to set frequency as ' + result + 'second.';
        _this.$http.post('/api/mqttPublishs', newConfig);
      }
      
    }, function() {
      console.log('cancel');  
      _this.message = 'You didn\'t set frequency.';
    });
  }

  advanceDialog(ev){
    this.$mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });  
  }

  stopTask(sensorConfig){
    this.$http.delete('/api/sensorConfigs/' + sensorConfig._id);
    this.$http.post('/api/mqttPublishs');
  }


}
  // DialogController($scope, $mdDialog) {
  //   $scope.hide = function() {
  //     $mdDialog.hide();
  //   };

  //   $scope.cancel = function() {
  //     $mdDialog.cancel();
  //   };

  //   $scope.answer = function(answer) {
  //     $mdDialog.hide(answer);
  //   };
  // };





angular.module('webdemoApp')
  .component('task', {
    templateUrl: 'app/mqtt/task/task.html',
    controller: TaskComponent,
    controllerAs: 'taskCtrl'
  });

})();

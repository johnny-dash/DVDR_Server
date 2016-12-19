'use strict';

(function(){

class TaskComponent {
  constructor($mdDialog) {
    this.message = '';
    this.$mdDialog = $mdDialog;
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
      .ok('Okay!')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(function(result) {
      console.log('confirm');
      _this.message = 'You decided to set frequency as ' + result + 'second.';
    }, function() {
      console.log('cancel');  
      _this.message = 'You didn\'t set frequency.';
    });
  }
}


angular.module('webdemoApp')
  .component('task', {
    templateUrl: 'app/mqtt/task/task.html',
    controller: TaskComponent,
    controllerAs: 'taskCtrl'
  });

})();

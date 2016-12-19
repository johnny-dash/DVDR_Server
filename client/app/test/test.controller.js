'use strict';

(function(){

class TestComponent {
  constructor($mdDialog) {
    this.message = 'Hello';
    this.$mdDialog = $mdDialog;

  }

  test(ev){
  	let _this = this;
	this.$mdDialog.show(
	      _this.$mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title(_this.message)
	        .textContent('You can specify some description text in here.')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	        .targetEvent(ev)
	    );
	  }
}

angular.module('webdemoApp')
  .component('test', {
    templateUrl: 'app/test/test.html',
    controller: TestComponent,
    controllerAs: 'testCtrl'
  });

})();

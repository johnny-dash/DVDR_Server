'use strict';

describe('Component: DeviceComponent', function () {

  // load the controller's module
  beforeEach(module('webdemoApp'));

  var DeviceComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DeviceComponent = $componentController('device', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

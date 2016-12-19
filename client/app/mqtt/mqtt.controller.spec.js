'use strict';

describe('Component: MqttComponent', function () {

  // load the controller's module
  beforeEach(module('webdemoApp'));

  var MqttComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MqttComponent = $componentController('mqtt', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

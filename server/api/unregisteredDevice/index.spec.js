'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var unregisteredDeviceCtrlStub = {
  index: 'unregisteredDeviceCtrl.index',
  show: 'unregisteredDeviceCtrl.show',
  create: 'unregisteredDeviceCtrl.create',
  update: 'unregisteredDeviceCtrl.update',
  destroy: 'unregisteredDeviceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var unregisteredDeviceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './unregisteredDevice.controller': unregisteredDeviceCtrlStub
});

describe('UnregisteredDevice API Router:', function() {

  it('should return an express router instance', function() {
    expect(unregisteredDeviceIndex).to.equal(routerStub);
  });

  describe('GET /api/unregisteredDevices', function() {

    it('should route to unregisteredDevice.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'unregisteredDeviceCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/unregisteredDevices/:id', function() {

    it('should route to unregisteredDevice.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'unregisteredDeviceCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/unregisteredDevices', function() {

    it('should route to unregisteredDevice.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'unregisteredDeviceCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/unregisteredDevices/:id', function() {

    it('should route to unregisteredDevice.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'unregisteredDeviceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/unregisteredDevices/:id', function() {

    it('should route to unregisteredDevice.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'unregisteredDeviceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/unregisteredDevices/:id', function() {

    it('should route to unregisteredDevice.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'unregisteredDeviceCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

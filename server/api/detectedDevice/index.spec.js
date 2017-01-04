'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var detectedDeviceCtrlStub = {
  index: 'detectedDeviceCtrl.index',
  show: 'detectedDeviceCtrl.show',
  create: 'detectedDeviceCtrl.create',
  update: 'detectedDeviceCtrl.update',
  destroy: 'detectedDeviceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var detectedDeviceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './detectedDevice.controller': detectedDeviceCtrlStub
});

describe('DetectedDevice API Router:', function() {

  it('should return an express router instance', function() {
    expect(detectedDeviceIndex).to.equal(routerStub);
  });

  describe('GET /api/detectedDevices', function() {

    it('should route to detectedDevice.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'detectedDeviceCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/detectedDevices/:id', function() {

    it('should route to detectedDevice.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'detectedDeviceCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/detectedDevices', function() {

    it('should route to detectedDevice.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'detectedDeviceCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/detectedDevices/:id', function() {

    it('should route to detectedDevice.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'detectedDeviceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/detectedDevices/:id', function() {

    it('should route to detectedDevice.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'detectedDeviceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/detectedDevices/:id', function() {

    it('should route to detectedDevice.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'detectedDeviceCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

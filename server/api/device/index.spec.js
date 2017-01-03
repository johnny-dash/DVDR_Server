'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var deviceCtrlStub = {
  index: 'deviceCtrl.index',
  show: 'deviceCtrl.show',
  create: 'deviceCtrl.create',
  update: 'deviceCtrl.update',
  destroy: 'deviceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var deviceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './device.controller': deviceCtrlStub
});

describe('Device API Router:', function() {

  it('should return an express router instance', function() {
    expect(deviceIndex).to.equal(routerStub);
  });

  describe('GET /api/devices', function() {

    it('should route to device.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'deviceCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/devices/:id', function() {

    it('should route to device.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'deviceCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/devices', function() {

    it('should route to device.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'deviceCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/devices/:id', function() {

    it('should route to device.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'deviceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/devices/:id', function() {

    it('should route to device.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'deviceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/devices/:id', function() {

    it('should route to device.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'deviceCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

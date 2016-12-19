'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sensorConfigCtrlStub = {
  index: 'sensorConfigCtrl.index',
  show: 'sensorConfigCtrl.show',
  create: 'sensorConfigCtrl.create',
  update: 'sensorConfigCtrl.update',
  destroy: 'sensorConfigCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensorConfigIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sensorConfig.controller': sensorConfigCtrlStub
});

describe('SensorConfig API Router:', function() {

  it('should return an express router instance', function() {
    expect(sensorConfigIndex).to.equal(routerStub);
  });

  describe('GET /api/sensorConfigs', function() {

    it('should route to sensorConfig.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sensorConfigCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sensorConfigs/:id', function() {

    it('should route to sensorConfig.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sensorConfigCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sensorConfigs', function() {

    it('should route to sensorConfig.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sensorConfigCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sensorConfigs/:id', function() {

    it('should route to sensorConfig.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sensorConfigCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sensorConfigs/:id', function() {

    it('should route to sensorConfig.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sensorConfigCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sensorConfigs/:id', function() {

    it('should route to sensorConfig.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sensorConfigCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});

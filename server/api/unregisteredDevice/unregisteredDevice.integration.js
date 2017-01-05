'use strict';

var app = require('../..');
import request from 'supertest';

var newUnregisteredDevice;

describe('UnregisteredDevice API:', function() {

  describe('GET /api/unregisteredDevices', function() {
    var unregisteredDevices;

    beforeEach(function(done) {
      request(app)
        .get('/api/unregisteredDevices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          unregisteredDevices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(unregisteredDevices).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/unregisteredDevices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/unregisteredDevices')
        .send({
          name: 'New UnregisteredDevice',
          info: 'This is the brand new unregisteredDevice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUnregisteredDevice = res.body;
          done();
        });
    });

    it('should respond with the newly created unregisteredDevice', function() {
      expect(newUnregisteredDevice.name).to.equal('New UnregisteredDevice');
      expect(newUnregisteredDevice.info).to.equal('This is the brand new unregisteredDevice!!!');
    });

  });

  describe('GET /api/unregisteredDevices/:id', function() {
    var unregisteredDevice;

    beforeEach(function(done) {
      request(app)
        .get('/api/unregisteredDevices/' + newUnregisteredDevice._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          unregisteredDevice = res.body;
          done();
        });
    });

    afterEach(function() {
      unregisteredDevice = {};
    });

    it('should respond with the requested unregisteredDevice', function() {
      expect(unregisteredDevice.name).to.equal('New UnregisteredDevice');
      expect(unregisteredDevice.info).to.equal('This is the brand new unregisteredDevice!!!');
    });

  });

  describe('PUT /api/unregisteredDevices/:id', function() {
    var updatedUnregisteredDevice;

    beforeEach(function(done) {
      request(app)
        .put('/api/unregisteredDevices/' + newUnregisteredDevice._id)
        .send({
          name: 'Updated UnregisteredDevice',
          info: 'This is the updated unregisteredDevice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUnregisteredDevice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUnregisteredDevice = {};
    });

    it('should respond with the updated unregisteredDevice', function() {
      expect(updatedUnregisteredDevice.name).to.equal('Updated UnregisteredDevice');
      expect(updatedUnregisteredDevice.info).to.equal('This is the updated unregisteredDevice!!!');
    });

  });

  describe('DELETE /api/unregisteredDevices/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/unregisteredDevices/' + newUnregisteredDevice._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when unregisteredDevice does not exist', function(done) {
      request(app)
        .delete('/api/unregisteredDevices/' + newUnregisteredDevice._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

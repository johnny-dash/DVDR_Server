'use strict';

var app = require('../..');
import request from 'supertest';

var newDetectedDevice;

describe('DetectedDevice API:', function() {

  describe('GET /api/detectedDevices', function() {
    var detectedDevices;

    beforeEach(function(done) {
      request(app)
        .get('/api/detectedDevices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          detectedDevices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(detectedDevices).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/detectedDevices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/detectedDevices')
        .send({
          name: 'New DetectedDevice',
          info: 'This is the brand new detectedDevice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDetectedDevice = res.body;
          done();
        });
    });

    it('should respond with the newly created detectedDevice', function() {
      expect(newDetectedDevice.name).to.equal('New DetectedDevice');
      expect(newDetectedDevice.info).to.equal('This is the brand new detectedDevice!!!');
    });

  });

  describe('GET /api/detectedDevices/:id', function() {
    var detectedDevice;

    beforeEach(function(done) {
      request(app)
        .get('/api/detectedDevices/' + newDetectedDevice._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          detectedDevice = res.body;
          done();
        });
    });

    afterEach(function() {
      detectedDevice = {};
    });

    it('should respond with the requested detectedDevice', function() {
      expect(detectedDevice.name).to.equal('New DetectedDevice');
      expect(detectedDevice.info).to.equal('This is the brand new detectedDevice!!!');
    });

  });

  describe('PUT /api/detectedDevices/:id', function() {
    var updatedDetectedDevice;

    beforeEach(function(done) {
      request(app)
        .put('/api/detectedDevices/' + newDetectedDevice._id)
        .send({
          name: 'Updated DetectedDevice',
          info: 'This is the updated detectedDevice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDetectedDevice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDetectedDevice = {};
    });

    it('should respond with the updated detectedDevice', function() {
      expect(updatedDetectedDevice.name).to.equal('Updated DetectedDevice');
      expect(updatedDetectedDevice.info).to.equal('This is the updated detectedDevice!!!');
    });

  });

  describe('DELETE /api/detectedDevices/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/detectedDevices/' + newDetectedDevice._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when detectedDevice does not exist', function(done) {
      request(app)
        .delete('/api/detectedDevices/' + newDetectedDevice._id)
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

'use strict';

var app = require('../..');
import request from 'supertest';

var newSensorConfig;

describe('SensorConfig API:', function() {

  describe('GET /api/sensorConfigs', function() {
    var sensorConfigs;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensorConfigs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorConfigs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sensorConfigs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/sensorConfigs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sensorConfigs')
        .send({
          name: 'New SensorConfig',
          info: 'This is the brand new sensorConfig!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSensorConfig = res.body;
          done();
        });
    });

    it('should respond with the newly created sensorConfig', function() {
      expect(newSensorConfig.name).to.equal('New SensorConfig');
      expect(newSensorConfig.info).to.equal('This is the brand new sensorConfig!!!');
    });

  });

  describe('GET /api/sensorConfigs/:id', function() {
    var sensorConfig;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensorConfigs/' + newSensorConfig._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorConfig = res.body;
          done();
        });
    });

    afterEach(function() {
      sensorConfig = {};
    });

    it('should respond with the requested sensorConfig', function() {
      expect(sensorConfig.name).to.equal('New SensorConfig');
      expect(sensorConfig.info).to.equal('This is the brand new sensorConfig!!!');
    });

  });

  describe('PUT /api/sensorConfigs/:id', function() {
    var updatedSensorConfig;

    beforeEach(function(done) {
      request(app)
        .put('/api/sensorConfigs/' + newSensorConfig._id)
        .send({
          name: 'Updated SensorConfig',
          info: 'This is the updated sensorConfig!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSensorConfig = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSensorConfig = {};
    });

    it('should respond with the updated sensorConfig', function() {
      expect(updatedSensorConfig.name).to.equal('Updated SensorConfig');
      expect(updatedSensorConfig.info).to.equal('This is the updated sensorConfig!!!');
    });

  });

  describe('DELETE /api/sensorConfigs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sensorConfigs/' + newSensorConfig._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sensorConfig does not exist', function(done) {
      request(app)
        .delete('/api/sensorConfigs/' + newSensorConfig._id)
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

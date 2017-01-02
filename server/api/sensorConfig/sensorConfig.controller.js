/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensorConfigs              ->  index
 * POST    /api/sensorConfigs              ->  create
 * GET     /api/sensorConfigs/:id          ->  show
 * PUT     /api/sensorConfigs/:id          ->  update
 * DELETE  /api/sensorConfigs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import SensorConfig from './sensorConfig.model';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of SensorConfigs
export function index(req, res) {
  return SensorConfig.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single SensorConfig from the DB
export function show(req, res) {
  return SensorConfig.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SensorConfig in the DB
export function create(req, res) {
  return SensorConfig.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SensorConfig in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return SensorConfig.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SensorConfig from the DB
export function destroy(req, res) {
  return SensorConfig.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


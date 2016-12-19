/**
 * SensorConfig model events
 */

'use strict';

import {EventEmitter} from 'events';
import SensorConfig from './sensorConfig.model';
var SensorConfigEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SensorConfigEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SensorConfig.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SensorConfigEvents.emit(event + ':' + doc._id, doc);
    SensorConfigEvents.emit(event, doc);
  }
}

export default SensorConfigEvents;

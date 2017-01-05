/**
 * UnregisteredDevice model events
 */

'use strict';

import {EventEmitter} from 'events';
import UnregisteredDevice from './unregisteredDevice.model';
var UnregisteredDeviceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UnregisteredDeviceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UnregisteredDevice.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UnregisteredDeviceEvents.emit(event + ':' + doc._id, doc);
    UnregisteredDeviceEvents.emit(event, doc);
  }
}

export default UnregisteredDeviceEvents;

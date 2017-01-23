/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var socketio;

export function register(socket) {
  // Bind model events to socket events
  socketio = socket;
}


export function updateView(message){
  socketio.emit('updates', message);
}
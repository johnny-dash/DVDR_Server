'use strict';

import mongoose from 'mongoose';

var DeviceSchema = new mongoose.Schema({
  name: String,
  serial: String,
  ports: [{
  	name: String,
  	state: String
  }]
});

export default mongoose.model('Device', DeviceSchema);

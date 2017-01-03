'use strict';

import mongoose from 'mongoose';

var SensorConfigSchema = new mongoose.Schema({
  task: String,
  device: String,
  sensor: String,
  port: String,
  frequency: Number
});

export default mongoose.model('SensorConfig', SensorConfigSchema);

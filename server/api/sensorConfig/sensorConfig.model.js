'use strict';

import mongoose from 'mongoose';

var SensorConfigSchema = new mongoose.Schema({
  task: String,
  sensor: String,
  port: String,
  frequency: Number,
  active: Boolean
});

export default mongoose.model('SensorConfig', SensorConfigSchema);

'use strict';

import mongoose from 'mongoose';

var SensorSchema = new mongoose.Schema({
  id: String,
  sensor: String,
  port: String,
  value: String,
  date: Date
});

export default mongoose.model('Sensor', SensorSchema);

'use strict';

import mongoose from 'mongoose';

var SensorConfigSchema = new mongoose.Schema({
  taskname: String,
  taskid: String, 
  device: String,
  sensor: String,
  port: String,
  frequency: Number,
  enrollment: String,
  status: String,
  data: [{
  	value: String,
    date: Date
  }]

});

export default mongoose.model('SensorConfig', SensorConfigSchema);

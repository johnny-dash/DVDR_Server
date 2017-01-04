'use strict';

import mongoose from 'mongoose';

var DetectedDeviceSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('DetectedDevice', DetectedDeviceSchema);

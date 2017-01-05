'use strict';

import mongoose from 'mongoose';

var UnregisteredDeviceSchema = new mongoose.Schema({
  serial: String
});

export default mongoose.model('UnregisteredDevice', UnregisteredDeviceSchema);

'use strict';

var express = require('express');
var controller = require('./mqttPublish.controller');

var router = express.Router();

router.post('/', controller.create);
router.post('/update', controller.update);
router.post('/stop', controller.stop);

module.exports = router;

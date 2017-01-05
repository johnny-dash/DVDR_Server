/**
 * Using Rails-like standard naming convention for endpoints.

 */

'use strict';

import _ from 'lodash';
var client = require('./../../MQTT');

export function create(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':start:' + newConfig.frequency + ':' + newConfig.port;
	client.publish('0000000081d839e0:task', message, function() {
    	 
  	});
}

export function update(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':update:' + newConfig.frequency + ':' + newConfig.port;
	client.publish('0000000081d839e0:task', message, function() {
    	 
  	});
}

export function stop(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':stop:' + newConfig.frequency + ':' + newConfig.port;
	client.publish('0000000081d839e0:task', message, function() {
    	 
  	});
}

export function register(req, res) {
	
}
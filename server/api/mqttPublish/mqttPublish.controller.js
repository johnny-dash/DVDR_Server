/**
 * Using Rails-like standard naming convention for endpoints.

 */

'use strict';

import _ from 'lodash';
var client = require('./../../MQTT').client;

export function create(req,res){
	var newConfig = req.body;
	console.log(newConfig);
	var message = newConfig.sensor + ':start:' + newConfig.frequency + ':' + newConfig.port + ':' + newConfig.enrollment + ':' + newConfig.taskid;
	var topic = newConfig.device + ':task';
	client.publish(topic, message, function() {
  	});
}

export function update(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':update:' + newConfig.frequency + ':' + newConfig.port+ ':' + newConfig.enrollment + ':' + newConfig.taskid;
	var topic = newConfig.device + ':task';
	client.publish(topic, message, function() {
    	 // 
  	});
}

export function restart(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':restart:' + newConfig.frequency + ':' + newConfig.port+ ':' + newConfig.enrollment + ':' + newConfig.taskid;
	var topic = newConfig.device + ':task';
	client.publish(topic, message, function() {
    	 
  	});
}

export function stop(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':stop:' + newConfig.frequency + ':' + newConfig.port+ ':' + newConfig.enrollment + ':' + newConfig.taskid;
	var topic = newConfig.device + ':task';
	client.publish(topic, message, function() {
    	 
  	});
}

export function deletetsk(req,res){
	var newConfig = req.body;
	var message = newConfig.sensor + ':delete:' + newConfig.frequency + ':' + newConfig.port+ ':' + newConfig.enrollment + ':' + newConfig.taskid;
	var topic = newConfig.device + ':task';
	client.publish(topic, message, function() {
    	 
  	});
}

export function unbound(req, res) {
	var serial = req.body.serial;
	var topic = serial + ":device";
	var message = "unregistered";
	console.log(topic);
	console.log(message);
	client.publish(topic, message, function () {
		// body...
	});

	
}
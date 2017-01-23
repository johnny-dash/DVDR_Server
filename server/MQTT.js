import mqtt from 'mqtt';
import SensorConfig from './api/sensorConfig/sensorConfig.model';
import Device from './api/device/device.model';
import UnregisteredDevice from './api/unregisteredDevice/unregisteredDevice.model';
var _ = require('lodash');
var socket = require('./api/socket/socket.socket');

var client =  mqtt.connect({ host: '130.56.250.107', port: 1883 });




// the buff to store all revice data
var buffer = {};
//store the data in buffer into database
function updateDate(callback){
  if(!( _.isEmpty(buffer))){
    for(var key in buffer){
      SensorConfig.update({taskid: key}, {
        $push: {data : {$each: buffer[key]}}
      }, {upsert: true}, function(err){
        if(err){
          console.log(err);
        }
      });
    }
  }
  if(callback) callback();
}

//the interval funciton
function init(callback){
  setInterval(function() {
    updateDate(function(){
      console.log("data has been saved");
      // If buffer is not empty, clean the buffer
      if(!( _.isEmpty(buffer) )) {
        buffer = {}
      }   
    });
  }, 120 * 1000);
}

//Start the Interval function and record the data
init();


client.on('connect', function() { // When connected
// subscribe to a topic
  client.subscribe('#', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("");
      console.log("topic: " + topic.toString());
      console.log("message: " + message.toString());
      //Filter the sensor meta data and store into database
      if((topic != 'Helloworld') && (topic != 'Greeting from new Raspberry Pi')){
        var device = topic.toString().split(":")[0];
        var task_id = topic.toString().split(":")[1];
        var port  = topic.toString().split(":")[2];
        var value = message.toString().split("@")[0];
        var date = message.toString().split("@")[1];
        
        //send data into socket and update the view
        var metadata = {
          device: device,
          value: value,
          port: port,
          date: date
        }
        socket.updateView(metadata);

        //put the data into buffer
        if((value != null) && (date != null)){
          // console.log("Device: " + device);
          // console.log("Task: " + task_id);
          // console.log("Port: " + port);
          // console.log("Value: " + value);
          // console.log("Date: " + date);
          if(!(task_id in buffer)){
              buffer[task_id] = [];
              buffer[task_id].push({
                value: value,
                date: date
              });
          } else {
            buffer[task_id].push({
                value: value,
                date: date
            });
          }
        }
      }

      //Filter the greeting from unregister device and store into db
      if(topic == 'Greeting from new Raspberry Pi'){
        Device.findOne({serial: message.toString()}, function(err, device){
            if(err) return err;
            if(device == null){
              UnregisteredDevice.findOne({serial: message.toString()}, function(err, unreg_device){
                if(unreg_device == null){
                  var newUnregisteredDevice = new UnregisteredDevice({
                      serial: message.toString()
                  });
                  newUnregisteredDevice.save();
                }
              });
            }
        });
        client.publish(message.toString() + ":device", "record", function(){

        });
      }
    });
  });
});



// publish a message to a topic
client.publish('Helloworld', 'MQTT subscriber on Node Server is running', function() {
//client.end(); // Close the connection when published
});

exports.client = client;



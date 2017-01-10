import mqtt from 'mqtt';
import Sensor from './api/sensor/sensor.model'
import Device from './api/device/device.model'
import UnregisteredDevice from './api/unregisteredDevice/unregisteredDevice.model'

var client  = mqtt.connect({ host: '130.56.250.107', port: 1883 })
 
// client.on('connect', function () {
//   client.subscribe('presence')
//   client.publish('presence', 'Hello mqtt')
// })
 
// client.on('message', function (topic, message) {
//   // message is Buffer 
//   console.log(message.toString())
//   client.end()
// })

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('#', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("");
      console.log(topic.toString() + ":" + message.toString());

      //Filter the sensor meta data and store into database
      if((topic != 'Helloworld') && (topic != 'task') && (topic != 'device')){
        var device = topic.toString().split(":")[0];
        var sensor = topic.toString().split(":")[1];
        var port  = topic.toString().split(":")[2];
        var value = message.toString().split("=")[1];
        var currentdate = new Date();
        console.log("Device: " + device);
        console.log("Sensor: " + sensor);
        console.log("Port: " + port);
        console.log("Value: " + value);
        
        console.log(message.toString());
        var newData = new Sensor({
            id: device,
            sensor: sensor,
            port: port,
            value: value,
            date: currentdate
        });
        newData.save();
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

  // publish a message to a topic
  client.publish('Helloworld', 'MQTT subscriber on Node Server is running', function() {
    //client.end(); // Close the connection when published
  });
});

module.exports = client;
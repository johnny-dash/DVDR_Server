import mqtt from 'mqtt';
import Sensor from './api/sensor/sensor.model'

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
      var device = topic.toString().split(":")[0];
      var sensor = topic.toString().split(":")[1];
      var port  = topic.toString().split(":")[2];
      var value = message.toString().split("=")[1];
      var currentdate = new Date();
      console.log("Device: " + device);
      console.log("Sensor: " + sensor);
      console.log("Port: " + port);
      console.log("Value: " + value);
      console.log("");
      console.log(message.toString());
      var newData = new Sensor({
          id: device,
          sensor: sensor,
          port: port,
          value: value,
          date: currentdate
      });

      newData.save();
    });
  });

  // publish a message to a topic
  client.publish('Helloworld', 'MQTT subscriber on Node Server is running', function() {
    //client.end(); // Close the connection when published
  });
});

module.exports = client;
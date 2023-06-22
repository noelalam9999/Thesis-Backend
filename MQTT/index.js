const mqtt = require('mqtt')

var options = {
    host: 'e60a7fae13a04a2b94a8f1a5811ac024.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'horen',
    password: 'alam2323'
}
var client = mqtt.connect(options);
client.on('connect', function () {
    console.log('Connected');
});
client.subscribe('mqtt');
client.publish('mqtt', JSON.stringify({
    horn : 0
}));
client.on('message', async function (topic, message) { 
    try{
        const data = await JSON.parse(message);
        console.log(data)  
    }
    catch(e){
        console.log(e);
    }
});

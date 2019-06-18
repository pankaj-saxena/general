
const config = require('config');
const kafka = require('kafka-node');

let kafka_host = config.get('kafka.host');
let kafka_port = config.get('kafka.port');
let topic = config.get('kafka.topic');

var kclient = new kafka.KafkaClient({kafkaHost: kafka_host +':' + kafka_port});

function receiveMessage(client){    
    console.log("listening to topic '%s' ...", topic);
    var Consumer = kafka.Consumer;   
    var consumer = new Consumer(client,
        [
            { topic: topic, partition: 0}
        ],
        {
            autoCommit: true
        });
        

        consumer.on("message", function(message){
            var event = message.value;
            console.log("Message received:\n"+ event);
        })     
   
}


receiveMessage(kclient);



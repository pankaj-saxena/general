
var config = require('config');
var kafka = require('kafka-node');
var  fs = require('fs');

var kafka_host = config.get('kafka.host');
var kafka_port = config.get('kafka.port');
var topic = config.get('kafka.topic');

var kclient = new kafka.KafkaClient({kafkaHost: kafka_host +':' + kafka_port});


async function sendMessage(client,message){

    var Producer = kafka.Producer;
    var KeyedMessage = kafka.KeyedMessage;    
    var producer = new Producer(client);
    var km = new KeyedMessage('key', 'message');
    var payloads = [
                        { topic: topic, messages: message, partition: 0 }
                    ];

    return new Promise(function(resolve,reject){

             
    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            if(err){
                reject(err);
            } else {
                resolve(JSON.stringify(data));
            }
            
            
        });
    });

    producer.on('error', function (err) {
        reject(err);
    })

})   
}

function receiveMessage(client){    
    console.log("listening to tope '%s' ...", topic);
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

try{
     //var data = fs.readFileSync('./data/invalid-response.json');    
     //var res= sendMessage(client, data.toString());    
     //console.log("Message sent:\n"+res.toString()); 
     //receiveMessage(kclient);
     

}catch(error){
    console.error(error);
}




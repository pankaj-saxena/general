
const config = require('config');
const kafka = require('kafka-node');
const  fs = require('fs');

let kserver = config.get('kafka.server');
let topic = config.get('kafka.topic');

let kclient = new kafka.KafkaClient({kafkaHost: kserver});


async function sendMessage(client,message){
    let Producer = kafka.Producer;
    let KeyedMessage = kafka.KeyedMessage;    
    let producer = new Producer(client);   
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


sendMessage(kclient,'hello world..!!')
.then(console.log)
.catch(console.log);




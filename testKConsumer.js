
const config = require('config');
const kafka = require('kafka-node');

let kserver = config.get('kafka.server');
let topicName = config.get('kafka.topic');

var kclientId = "hydcustomerconsentcust-ref";
var groupName = "hydcustomerconsentcust-ref-grp1";

function initiateKafkaConsumerGroup (groupName, topicName) {
    var options = {
      // connect directly to kafka broker (instantiates a KafkaClient)
      kafkaHost: kserver,
      groupId: groupName,
      autoCommit: true,
      autoCommitIntervalMs: 5000,
      sessionTimeout: 15000,
      fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
      // An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for
      // built ins (see below to pass in custom assignment protocol)
      protocol: ['roundrobin'],
      // Offsets to use for new groups other options could be 'earliest' or 'none'
      // (none will emit an error if no offsets were saved) equivalent to Java client's auto.offset.reset
      fromOffset: 'latest',
      // how to recover from OutOfRangeOffset error (where save offset is past server retention)
      // accepts same value as fromOffset
      outOfRangeOffset: 'earliest'
    };
  
    var consumerGroup = new kafka.ConsumerGroup(options, topicName);
  
    consumerGroup.on('message', function (message) {
      console.log('Message: ' + message);
      //TODO: You can write your code or call messageProcesser function
    });
  
    consumerGroup.on('error', function onError(error) {
      console.error(error);
    });
  
    console.log('Started Consumer for topic "' + topicName + '" in group "' + groupName + '"');
  };

/*var kclient = new kafka.KafkaClient({kafkaHost: kserver});

function receiveMessage(client){    
    console.log("listening to topic '%s' ...", topic);
    var Consumer = kafka.Consumer;   
    var consumer = new Consumer(client,
        [
            { topic: topic, partition: 0}
        ],
        {
            //groupId: kgroupId,        
            autoCommit: true
        });
        

        consumer.on("message", function(message){
            var event = message.value;
            console.log("Message received:\n"+ event);
        })     

        consumer.on('error', function (err) {
            console.log(err);
        })
   
}*/


//receiveMessage(kclient);

initiateKafkaConsumerGroup(groupName,topicName);



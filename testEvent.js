var events = require('events');

var eventEmmiter = new events.EventEmitter();

var connectHandler = function connected() {
    console.log('connection succeessful');
    eventEmmiter.emit('data_received');    
}

eventEmmiter.on('connection',connectHandler);

eventEmmiter.on('data_received',function(){
    console.log('data received from the file');
})

console.log ('Program started to listen events...')

eventEmmiter.emit('connection');

console.log('Program ended.')
console.log(__filename);
console.log(__dirname);



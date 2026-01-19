const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// initialize the object

const myEmitter = new MyEmitter()

// add listener for the log event

myEmitter.on('log', (msg)=>logEvents(msg));

setTimeout(()=>{
    // Emmit the event
    myEmitter.emit('log', 'Log event emmitted')
},2000);
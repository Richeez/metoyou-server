const logEvents = require('./logEvents')
const EventEmitter = require('events')
class MyEmitter extends EventEmitter { };
//? initialize object
const myEmitter = new MyEmitter();

//? add listener for log events
myEmitter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
    //? Emmit events
    myEmitter.emit('log', 'log event emmitted successfully')

}, 2000);

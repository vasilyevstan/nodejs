const { emit } = require('process');
const logEvents = require('./logEvents');

const EventEmitter = require ('events');

class MyEmitter extends EventEmitter {};

// init obj 
const myEmitter = new MyEmitter();

// add listener for log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    //emit events
    myEmitter.emit('log', 'Log event emitted again');
}, 2000);
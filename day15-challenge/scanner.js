const Event = require('events').EventEmitter;
const util = require('util');

const make = { '아메리카노' : 3000, '카페라떼' : 5000, '프라프치노' : 7000 };

const Scanner = function(OrderQueue) {
    this.on('read', function(line) {
        let data = line.split(',');
        const owner = data[0];
        for ( let i = 1; i < data.length; i++ ) {
            data[i] = data[i].trim();
            let menuCount = data[i].split(':')[1];
            const name = data[i].split(':')[0];
            while ( menuCount-- > 0 )
                OrderQueue.push( { 'name' : name, 'owner' : owner, 'state' : "idle", 'time' : make[name] } );
        }
    })
}

util.inherits(Scanner, Event);

module.exports = Scanner;
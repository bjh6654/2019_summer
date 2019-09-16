const Event = require('events').EventEmitter;
const util = require('util');
const MyFunc = require('./utils');

const Dash = function() {
    // 이벤트 리스너 등록
    this.on('update', function(Dash, Order) {
        MyFunc.WRITE_FILE("dash.html", Dash, Order);
    })
}

util.inherits(Dash, Event);

module.exports = Dash;
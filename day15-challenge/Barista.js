const Event = require('events').EventEmitter;
const util = require('util');
const MyFunc = require('./utils');

const Barista = function(manager, num, MY_DRINK) {
    this.num = num;
    this.manager = manager;
    this.manager.emit('add', this);
    this.work = 0;
    this.MY_DRINK = MY_DRINK;
    // 이벤트 리스너 등록
    this.on('work', function(menu) {
        MyFunc.PRINT_TIME();
        console.log(`바리스타 ${this.num} : ${menu.owner}${menu.name} 시작`);
        setTimeout( () => {
            MyFunc.PRINT_TIME();
            console.log(`바리스타 ${this.num} : ${menu.owner}${menu.name} 완료`);
            this.manager.emit('complete', this, menu);
        }, menu.time);
    })
}

util.inherits(Barista, Event);

module.exports = Barista;
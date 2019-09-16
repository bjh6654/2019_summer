const Event = require('events').EventEmitter;
const util = require('util');
const Barista = require('./Barista.js');
const MyFunc = require('./utils');
const Dash = require('./dash.js');


const DRINK_TYPE = [ "", "아메리카노", "카페라떼", "프라프치노" ];
const dash = new Dash();

const Manager = function(OrderQueue) {
    this.IDLE_WORKER = [];
    this.MENU_DASHBOARD = [];
    this.LAST_TIME = new Date().getTime();
    this.FIRST_ORDER = false;
    this.OrderCount = {};
    // 이벤트 리스너 등록
    this.once('init', function(BaristaCount, MAX_MULTI) {
        this.BaristaCount = BaristaCount;
        for ( let a = 1; a <= MAX_MULTI; a++ )
            for ( let i = 1; i <= BaristaCount; i++ )
                new Barista(this, i);
    })
    
    this.once('init_seperate', function(BaristaCount, MAX_MULTI) {
        this.BaristaCount = BaristaCount;
        for ( let a = 1; a <= MAX_MULTI; a++ )
            for ( let i = 1; i <= BaristaCount; i++ )
                if ( i >= 1 && i <= 3 )
                    new Barista(this, i, DRINK_TYPE[i]);
                else
                    new Barista(this, i);
    })

    this.on('update', function(menu) {
        this.MENU_DASHBOARD.find( (item) => {
            if ( item === menu ) {
                item.state = "complete";
                return true;
            }
            return false;
        } )
        dash.emit('update', this.MENU_DASHBOARD, OrderQueue);
        this.LAST_TIME = new Date().getTime();
        this.FRIST_ORDER = true;
    })

    this.on('add', function(Barista) {
        this.IDLE_WORKER.push(Barista);
    })

    this.once('check_order', function() {
        setInterval( () => {
            if ( OrderQueue.length && this.IDLE_WORKER.length ) {
                const menu = OrderQueue.shift();
                if ( !this.OrderCount[menu.owner] )
                    this.OrderCount[menu.owner] = 0;
                this.OrderCount[menu.owner]++;
                menu.state = "ready";

                const CURRENT_WORKER = this.IDLE_WORKER.shift();
                if ( !CURRENT_WORKER.MY_DRINK )
                    CURRENT_WORKER.emit('work', menu);
                else if ( menu.name == CURRENT_WORKER.MY_DRINK )
                    CURRENT_WORKER.emit('work', menu);
                else {
                    this.IDLE_WORKER.push(CURRENT_WORKER);
                    OrderQueue.unshift(menu);
                }

                this.MENU_DASHBOARD.push(menu);
            } else if ( this.FRIST_ORDER && this.IDLE_WORKER.length >= this.BaristaCount*2 && this.LAST_TIME + 3000 <= new Date().getTime() ) {
                MyFunc.PRINT_TIME();
                MyFunc.GO_HOME();
                process.exit();
            }
        }, 1000 );
    })

    this.on('complete', function(Barista, menu) {
        this.emit('add', Barista);
        this.emit('update', menu);
        this.OrderCount[menu.owner]--;
        if ( !this.OrderCount[menu.owner] )
            console.log(`☆ ★ ☆ ★ [ 주문완료 ] "${menu.owner}" ☆ ★ ☆ ★ `);
    })
}

util.inherits(Manager, Event);

module.exports = Manager;
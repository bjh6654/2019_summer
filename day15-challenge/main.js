const Manager = require('./Manager.js');
const Scanner = require('./Scanner.js');
const readline = require('readline');

const R = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

this.Order = [];
const scanner = new Scanner(this.Order);
const manager = new Manager(this.Order);

R.setPrompt("바리스타 수 : ");
R.prompt();
R.on("line", line => {
    if ( !this.BaristaCount ) {
        if ( !isNaN(line) ) {
            this.BaristaCount = line;
        } else {
            R.prompt("숫자를 입력해주세요 : ");
        }
    } else {
        if ( this.BaristaCount >= 3 )
            manager.emit('init_seperate', this.BaristaCount, 2);
        else
            manager.emit('init', this.BaristaCount, 2);
        scanner.emit('read', line);
        manager.emit('check_order');
    }
});


// a, 아메리카노:2, 프라프치노:1
// b, 카페라떼:3, 아메리카노:4
// ㅂㅂㅂ, 카페라떼:2
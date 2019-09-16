const assert = require("assert");
const util = require("./util.js");
const readline = require('readline');
const R = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class controller {
    constructor(model) {
        this.TodoModel = model;
    }

    runTodo() {
        const instruct = [ "show", "add", "update", "delete", "q" ];
        R.setPrompt("명령하세요 : ");
        R.prompt();
        R.on('line', async line => {
            const input = line.split("$$");
            if ( line !== "q" ) {
                const act = input[0];
                const param = input.slice(1);
                try {
                    assert( (instruct).includes(act) );
                    if ( act == "update" )
                        await util.delay(2000);
                    this.TodoModel[act](...param);
                } catch ( e ) {
                    console.log(e);
                    util.inputErr();
                }
                R.prompt();
            } else {
                console.log("프로세스가 종료 됩니다.");
                R.close();
            }   
        });
    }
}

module.exports = controller;
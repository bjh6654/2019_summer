const util = require("./util.js");
const Publisher = require("./Observable.js");

const Model = function(list) {
    this.todolist = list;
    const State = (this.todolist).reduce( (list, cur) => {
        list[cur.state].push(cur.id);
        return list;
    }, { todo : [], doing : [], done : [] } );
    this.state = `현재상태 : todo[${State.todo.join(',')}], doing[${State.doing.join(',')}], done[${State.done.join(',')}]`;
}

Model.prototype = new Publisher();

Model.prototype.add = function(...param) {
    if ( param.length < 1 )
        throw "Err";
    const obj = makeOBJ(param[0], param.slice[1]);
    this.todolist.push(obj);
    console.log(`'${obj.name}'가 추가되었습니다. (id : ${obj.id})`);
    this.showcurrent();
}

Model.prototype.show = function(state) {
    if ( state === "current" )
        this.showcurrent();
    else if ( ["todo","doing","done"].includes(state) ) {
        const out = this.todolist.filter( e => e.state === state );
        console.log(out.reduce( (str, cur) => `${str} ${cur.name},`, `총 ${out.length}건 :` ).slice(0,-1));
    } else {
        throw "Err";
    }
}

Model.prototype.showcurrent = function() {
    const State = (this.todolist).reduce( (list, cur) => {
        list[cur.state].push(cur.id);
        return list;
    }, { todo : [], doing : [], done : [] } );
    this.state = `현재상태 : todo[${State.todo.join(',')}], doing[${State.doing.join(',')}], done[${State.done.join(',')}]`;
    console.log(this.state);
    this.notifyObservers();
}

Model.prototype.update = async function(...param) {
    if ( param.length < 2 || !["todo", "doing", "done"].includes(param[1]) )
        throw "Err";
    let count = 0;
    (this.todolist).map( e => {
        if ( e.id == param[0] ) {
            e.state = param[1];
            console.log(`'${e.name}'의 상태가 ${e.state}로 변경되었습니다.`);
            count++;
        }
        return e;
    } );
    if ( count == 0 )
        console.log("입력한 ID 가 없습니다.");   
    this.showcurrent();
}

Model.prototype.del = function(id) {
    const len = todolist.length;
    this.todolist = (this.todolist).filter( e => {
        if ( e.id != id )
            return true;
        console.log(`'${e.name}'이 ${e.state}목록에서 삭제되었습니다.`);
        return false;
        } );
    if ( (this.todolist).length == len );
        console.log("입력한 ID 가 없습니다.");
    this.showcurrent();
}

function makeOBJ(NAME, TAG = []) {
    return { id : util.makeUUID(), name : NAME, state : "todo", tag : TAG };
}

// (async function a() {
    // let a = new Model([]);
    // a.add("집가고싶다", "sdsds");

    // await util.delay(1000);
    // a.update(100, "done");
    // console.log("2초");
// }) ();

module.exports = Model;
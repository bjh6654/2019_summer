let data = require("./data.json");
var fs = require("fs");

const readline = require('readline');
const R = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

R.setPrompt("명령하세요 : ");
R.prompt();
R.on('line', async function(line) {
const inst = line.split("$$");
switch (inst[0]) {
    case "show":
        show(inst[1]);
        break;
    case "add":
        add(inst[1], inst.slice(1));
        showCurrent();
        break;
    case "update":
        data = await update(inst[1], inst[2]);
        showCurrent();
        break;
    case "delete":
        data = del(inst[1]);
        showCurrent();
        break;
    case "q": {
        fs.writeFileSync( "log.html", JSON.stringify( data ), "utf8");
        console.log("프로그램이 종료 됩니다.");     process.exit();
    }
    default:
        inputErr();
    }
    R.prompt();
});

function inputErr() {
    console.log(
`======================== How To Use ========================
show    : $$['current' or 'todo' or 'doing' or 'done']
add     : $$ ID $$ [TAGS $$ ....]
update  : $$ ID $$ state
delete  : $$ ID
q       : Terminate Process
============================================================
        `);
}

function show(state) {
    const avail = [ "todo", "doing", "done" ];
    if ( state === "current" ) {
        showCurrent();
    } else if ( avail.includes(state) ) {
        const out = data.filter( e => e.state === state );
        console.log(out.reduce( (str, cur) => `${str} ${cur.name},`, `총 ${out.length}건 :` ).slice(0,-1));
    } else
        inputErr();
}

function showCurrent() {
    const State = data.reduce( (list, cur) => {
        list[cur.state].push(cur.id);
        return list;
    }, { todo : [], doing : [], done : [] } );
    console.log(`현재상태 : todo[${State.todo.join(',')}], doing[${State.doing.join(',')}], done[${State.done.join(',')}]`);
}

function add(name, tag) {
    let obj = makeOBJ();
    obj.name = name;
    obj.tag = tag;
    data.push(obj);
    console.log(`'${name}'가 추가되었습니다. (id : ${obj.id})`);
}

function update(id, state) {
    return new Promise( (resolve) => {
        setTimeout( function() {
            let count = 0;
            const d = data.map( e => {
                if ( e.id == id ) {
                    e.state = state;
                    console.log(`'${e.name}'의 상태가 ${state}로 변경되었습니다.`);
                    count++;
                }
                return e;
            } );
            if ( count == 0 )
                console.log("입력한 ID 가 없습니다.");   
            resolve(d);
        }, 2000 );
    } )
}

function del(id) {
    const deleted = data.filter( e => {
        if ( e.id != id )
            return true;
        console.log(`'${e.name}'이 ${e.state}목록에서 삭제되었습니다.`);
        return false;
     } );
    if ( data.length == deleted.length )
        console.log("입력한 ID 가 없습니다.");
    return deleted;
}

function makeOBJ() {
    return { id : makeId(), name : "", state : "todo", tag : [] };
}

function makeId() {
    const ids = data.map( e => e.id );
    while ( ids.includes(makeId.count) ) {
        makeId.count++;
    };
    return makeId.count;
} 

makeId.count = 1;

/*
show$$current
show$$todo
add$$피어 세션$$12345
*/
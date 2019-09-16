const a = require("./a.js");
const assert = require("assert");
const msg = require("./c.js");
const data = require("./d.js");

const checker = new a.Checker(msg);
/*
    VSCode에서 line 옆을 클릭하면 해당 위치에 break point를 생성할 수 있다.
    break point를 생성하고 f5로 디버깅을 시작하면 해당위치의 시작 직전 기준 변수에 할당된 값을 체크 할 수 있다.
    (a, msg, data) 의 내용을 확인해서 exports를 수정하고, generator 를 이용해서 runner에서 함수를 실행한다.
    .next() 를 사용하여 실행시키면 run 내부에서 yield에 의해 중지되는데, 이때의 값을 .next().value를 통해 저장해두었다가
    다시 next() 에서 인자로 넘겨주면 정상실행된다. assert 모듈을 이용해서 에러를 발생시켜 try catch를 통한 디버깅도 가능하다.
*/

function* run(source, targets) {
        const rightMsg = msg.ok.msg;
        const checkMember = checker.bindMembers(targets);
        result = yield checkMember(source);
        result.then((value)=>{
            assert.equal(value, rightMsg);
            console.log("error없이 프로그래밍이 실행됐습니다");
        }).catch((e)=>console.log(`이크 에러가 발생했어요. ${e.message}`));
}


a.runner(run, data.ourStudents, ['crong', 'jk']);
a.runner(run, data.ourProfessors, ['Bill', 'Ritchie']);

/* 실행결과 
error없이 프로그래밍이 실행됐습니다
이크 에러가 발생했어요 'who are you?' == 'hello our members!'
*/
function runSync(id) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + 2000);
    console.log(`${id} sync 함수 실행`);
}

function runAsync(id) {
    console.log(id + " async 함수 실행");
}

function executeEventQueue(callstack, eventqueue) {
    setInterval( () => {
        if ( new Date().getTime() - executeEventQueue.time >= 5000 )
            process.exit();
        else if ( callstack.length )
            executeCallStack(callstack);
        else if ( !callstack.length && eventqueue.length )
            eventqueue.shift()();
    }, 0)
}

function executeCallStack(callstack) {
    while ( callstack.length )
        callstack.pop()();
    executeEventQueue.time = new Date().getTime();
}

let callStack = [runSync.bind(null, 1), runSync.bind(null, 2)];
let eventQueue = [runAsync.bind(null, 1), runAsync.bind(null, 2), runAsync.bind(null, 3)];

executeEventQueue(callStack, eventQueue);
executeCallStack(callStack);
callStack.push(runSync.bind(null, 3));
setTimeout(()=>callStack.push(runSync.bind(null, 4)), 6000);
setTimeout(()=>callStack.push(runSync.bind(null, 5)), 20000);
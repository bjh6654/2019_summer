const runTime = { '아메리카노' : 3, '라떼' : 5, '프라프치노' : 10 };

getState.state = true;
function getState() {
    return getState.state;
}

function setState(state) {
    getState.state = state;
}

onmessage = (e) => {
    if ( e.data == "check" ) {
        postMessage(getState());
    } else {
        // setState(false);
        // new Promise( (resolve) => {
        //     setTimeout( resolve(), runTime[e.data]*1000 )
        // } ).then( () => {
        //     postMessage(`${e.data} 완료`);
        //     setState(true)
        // });
    }
}
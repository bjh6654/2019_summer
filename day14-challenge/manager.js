function getTask() {
    return getTask.OrderQueue.shift();
}

function makeWorker() {
    let work = new Worker('./barista.js');
    work.onmessage = (e) => {
        if ( e.data && getTask.OrderQueue.length )
            work.postMessage(getTask());
        else if ( typeof(e.data) !== 'boolean' )
            postMessage(e.data);
    }
    return work;
}

onmessage = e => {
    getTask.OrderQueue = e.data.order;
    let count = e.data.count;
    let workerQueue = [];
    console.log(count);
    while ( count-- > 0 )
        makeWorker().postMessage("check");
}
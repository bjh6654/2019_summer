const sum = (a, b) => {
    return a + b;
}

const isEven = (n) => { return n % 2 == 0; }

const appendLazy = (arr, data, time) => {
    return new Promise(resolve => {
        setTimeout(()=> {
            arr.push(data);
            resolve(arr)
        }, time)
    });
}

module.exports = {sum, isEven, appendLazy}
const _ = require("lodash");

const printLOG = (msg, result) => {
    if ( result === "FAIL" )
        console.log(`\x1b[0m${msg} : \x1b[31m${result}`);
    else
        console.log(`\x1b[0m${msg} : ${result}`);
}

function test( msg, func ) {
    return new Promise( async (resolve, reject) => {
        try {
            await func();
            resolve();
        } catch {
            reject();
        }
    }).then( () => printLOG(msg, "PASS") ).catch( () => printLOG(msg, "FAIL") );
}

const assert = {    equal : (first, second) => {
                        if ( first !== second )
                            throw "FAIL";
                    },
                    notEqual : (first, second) => {
                        if ( first === second )
                            throw "FAIL";
                    },
                    detailEqual : (first, second) => {
                        if ( typeof(first) !== typeof(second) ) {
                            throw "FAIL";
                        } else {
                            if ( typeof(first) == "object" ) {
                                if ( first.length !== second.length )
                                    throw "FAIL";
                                else
                                    for ( let i = 0; i < first.length; i++ )
                                        assert.detailEqual(first[i], second[i]);
                            } else
                                if ( first !== second )
                                    throw "FAIL";
                        }
                    }
};

module.exports = { test, assert };
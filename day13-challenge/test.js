const { tokenizer, lexer, ArrayParser } = require('./arrayParser.js');
const assert = require('assert');

const str = "[1, [2,[3]],'hello world', null]";

function test( msg, func ) {
    return new Promise( async (resolve, reject) => {
        try {
            await func();
            resolve();
        } catch (e) {
            reject(e);
        }
    }).then( () => console.log(`${msg} : PASS`) ).catch( (e) => console.log(`${msg} : ${e}`) );
}

test("tokenizer Test", function() {
    assert.deepEqual(tokenizer(str), [ '[', '1', '[', '2', '[', '3', ']', ']', "'hello world'", 'null', ']' ]);
});

test("Bracket Error Test", function() {
    assert.throws(tokenizer.bind(null, "[[1,[2,[3],'hello world]]]"));
})

test("lexer Test", function() {
    assert.deepEqual(lexer([ '[', '1', '[', '2', '[', '3', ']', ']', "'hello world'", 'null', ']' ]),
    [ '{ type : \'left\', value : \'[\' }',
    '{ type : \'number\', value : 1 }',
    '{ type : \'left\', value : \'[\' }',
    '{ type : \'number\', value : 2 }',
    '{ type : \'left\', value : \'[\' }',
    '{ type : \'number\', value : 3 }',
    '{ type : \'right\', value : \']\' }',
    '{ type : \'right\', value : \']\' }',
    '{ type : \'string\', value : \'hello world\' }',
    '{ type : \'NULL\', value : "null" }',
    '{ type : \'right\', value : \']\' }' ]);
})

const json = `{ "type": "array", "child": [{ "type": "number", "value": 1 , "child": [] },{ "type": "array", "child": [{ "type": "number", "value": 2 , "child": [] },{ "type": "array", "child": [{ "type": "number", "value": 3 , "child": [] }] }] },{ "type": "string", "value": 'hello world' , "child": [] },{ "type": "NULL", "value": "null" , "child": [] }] }`;
test("ArrayParser Test", function() {
    assert.deepEqual(ArrayParser(str), json);
})
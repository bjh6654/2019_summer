const { xor, nor, nand, bin2dec, dec2bin, halfadder, fulladder, modByTwo, byteadder } = require("../src/이상원_day4.js")
const {test, assert }  = require("../lib/tester.js");

test(`'true' xor 'false' == 'true`, () => {
    assert.equal( xor(true, false), true ) // PASS
});

test(`'11100' to decimal == 28`, () => {
    assert.equal( bin2dec([ false, false, true, true, true ]), 28) // PASS
});

test(`'true' nand 'true' == 'false'`, () => {
    assert.notEqual(nand(true, true), false) // false == false : FAIL
});

test(`'true' add 'true' (halfadder) == [ true, true ]`, () => {
    assert.detailEqual(halfadder(true, true), [ true, true ]) // FAIL
});

test(`'true', 'true', 'carry : true' (fulladder) == [ true, true ]`, () => {
    assert.detailEqual(fulladder(true, true, true), [true, true]) // PASS
} )
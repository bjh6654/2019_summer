const {sum, isEven, appendLazy } = require("../src/source.js")
const _ = require("lodash");
const {test, assert }  = require("../lib/tester.js");

test('support notEqual', () => {
    assert.notEqual(undefined, null); //pass
});

test('adds 1 + 2 to equal 3', () => {
    assert.equal(sum(1,2), 3) //pass
});

test('should support flattening of nested arrays', function() {
    const arr = [1, [2, [3, [4]], 5]];
	assert.detailEqual(_.flatten(arr), [1, 2, [3, [4]], 5]); //pass
    assert.detailEqual(_.flattenDepth(arr,2), [1, 2, 3, [4], 5]); //pass
    assert.detailEqual(_.flattenDepth(arr,3), [1, 2, 3, [4], 5]);  //fail
});

test('should support filtering of arrays', function() {
    const arr = [1,2,3,4,5,6];
    assert.detailEqual(_.filter(arr, isEven), [2,4,5,6]); //fail
});

test('async test', async function() {
    // given
    const arr = [10, 20];
    // when
    await appendLazy(arr, 30, 2000);
    // then
    assert.detailEqual(arr, [10,20,30]);
}).finally( () => 
    test('should support filtering of arrays 2', function() {
        const arr = [1,2,3,4,5,6];
        assert.detailEqual(_.filter(arr, isEven), [2,4,6]); //pass
    })
);
const nand = (bitA, bitB) => !(bitA && bitB);

const nor = (bitA, bitB) => !(bitA || bitB);

const xor = (bitA, bitB) => nand(bitA, bitB) != nor(bitA || bitB);

const half = (bitA, bitB) => [ bitA && bitB, xor(bitA, bitB) ];

const full = (bitA, bitB, carry) => {
    const h = half(bitA, bitB);
    const h2 = half(h[1], carry);
    return [ xor(h[0],h2[0]), h2[1] ];
}

function setbits(bits, len) {
    let byte = [];
    bits.forEach( e => byte.push(e) );
    while (byte.length != len)
        byte.push(0);
    return byte;
}

function byteadder(byteA, byteB, len = 8) {
    if ( Math.max(byteA.length, byteB.length) > 8 )
        len = 16;
    byteA = setbits(byteA, len);
    byteB = setbits(byteB, len);
    let sum = [];
    sum.push(byteA.reduce( (pre, cur, idx) => {
        const result = full(byteA[idx], byteB[idx], pre);
        sum.push(result[1]);
        return result[0];
    }, 0 ));
    return sum;
}

function dec2bin(decimal) {
    let binary = [];
    while ( decimal > 0 ) {
        const remainder = decimal - parseInt(decimal/2)*2;
        binary.push(remainder == 1);
        decimal = parseInt(decimal/2);
    }
    return binary;
}

function bin2dec(binary) {
    let p = 1;
    return binary.reduce( (pre, cur) => {
        const value = cur * p;
        p *= 2;
        return pre + value;
     }, 0)
}

byteA  = [ 1, 1, 0, 1, 1, 0, 1, 0 ]
byteB  = [ 1, 0, 1, 1, 0, 0, 1, 1 ]

console.log(nand(true, true));
console.log(nor(false, true));
console.log(xor(true, false));
console.log(byteadder(byteA, byteB));
console.log(bin2dec(byteA));
console.log(dec2bin(28));
console.log(bin2dec(byteadder(dec2bin(2),dec2bin(10))));
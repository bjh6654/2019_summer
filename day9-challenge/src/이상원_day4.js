const halfadder = (bitA, bitB) => {
   let answer = [];
   answer.push(!nand(bitA, bitB));
   answer.push(xor(bitA, bitB));
   return answer;
}
const fulladder = (bitA, bitB, carry) => {
   let answer = [];
   let newCarry = !nor(!nand(bitA, bitB), !nand(carry, xor(bitA, bitB)));
   let sum = xor(xor(bitA, bitB), carry);
   answer.push(newCarry);
   answer.push(sum);
   return answer;
}
const byteadder = (byteA, byteB) => {
   let answer = [];
   let mrb = halfadder(byteA[0], byteB[0]);
   answer.push(mrb[1]);
   let carry = mrb[0];
   for (let i = 1; i < byteA.length; i++) {
       let currentNumber = fulladder(byteA[i], byteB[i], carry);
       answer.push(currentNumber[1]);
       carry = currentNumber[0];
   }
   answer.push(carry);
   return answer;
}

const modByTwo = (decimal) => {
   while (decimal >= 2) {
       decimal -= 2;
   }
   return decimal;
   return decimal & 1;
}
const dec2bin = (decimal) => {
   let answer = [];
   const helper = (decimal) => {
       if (decimal <= 0) {
           return;
       }
       answer.push(!!(modByTwo(decimal)));
       helper(parseInt(decimal / 2));
   }
   helper(decimal);
   return answer;
}
const bin2dec = (bin) => {
   let answer = 0;
   for (let i = bin.length - 1; i >= 0; i--) {
       answer = answer * 2;
       if (!!bin[i] === true) {
           answer += 1;
       }
   }
   return answer;
}

const nand = (paramA, paramB) => {
   let answer = true;
   if (paramA === true && paramB === true) {
       answer = false;
   }
   return answer;
}
const nor = (paramA, paramB) => {
   let answer = true;
   if ((paramA === false && paramB === false) === false) {
       answer = false;
   }
   return answer;
}
const xor = (paramA, paramB) => {
   let answer = true;
   if (paramA === paramB) {
       answer = false;
   }
   return answer;
}

module.exports = { xor, nor, nand, bin2dec, dec2bin, halfadder, fulladder, modByTwo, byteadder };
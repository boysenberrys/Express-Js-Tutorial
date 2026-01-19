console.log('Hello World!');

const os = require('os');
const path = require('path')
const math = require('./math')

// IMPORT BY DISTRUCTURING

const {add, substract, divide, multiply} = require('./math')

console.log(add(2,3))  //5
console.log(multiply(3,4));  //12
console.log(divide(4,2))  //2
console.log(substract(4,2))  //2



/*

console.log(math.add(2,3));
console.log(math.substract(2,3));
console.log(math.divide(2,3));
console.log(math.multiply(2,3));

=============================================

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log('=================================')

console.log(__dirname);
console.log(__filename);

console.log('=================================');

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
*/


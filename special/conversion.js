/* Number
console.log(Number(123)) // 123
console.log(Number('123')) // 123
console.log(Number('123abc'))  // NaN
console.log(Number(true))  // 1
console.log(Number(false))  // 0
console.log(Number('')) // 0
console.log(Number(null))  // 0
console.log(Number('false'))  // NaN
console.log(Number(undefined))  // NaN
console.log(Number({}))  // NaN
console.log(Number([]))  // 0
console.log(Number([1,2,3]))  // NaN
console.log(Number({1:2}))  // NaN
console.log(Number([5]))  // 5
 */

/* //自动
console.log('5' + 1) // '51'
console.log('5' + true) // "5true"
console.log('5' + false) // "5false"
console.log('5' + {}) // "5[object Object]"
console.log('5' + []) // "5"
console.log('5' + function (){}) // "5function (){}"
console.log('5' + undefined) // "5undefined"
console.log('5' + null) // "5null" */
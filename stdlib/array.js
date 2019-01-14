/* var arr = []
arr.push(1,2,3)
arr.pop()
console.log(arr) */

/* var obj = { 0: 'a', 1: 'b', length: 2 };
var brr = Array.prototype.join.call(obj, '-')
console.log(brr) */

/* var arr = [1,2,3,4,5]
var brr = arr.concat(6,7,8)
console.log(brr) */

/* 
var arr = [1,4,7,3,8,9,325,89,1]
arr.sort((a,b)=>{
    return a-b
})
console.log(arr) */

/* var arr = ['a', 'b', 'c'];
var brr = [1,2]
var crr = brr.map(function (e) {
  return this[e]
}, arr)
console.log(crr) */

/* var arr = [1,2,3,4,5,6,7]
var crr = {max:3}
var brr = arr.filter(function(e,i,a){
    return e>this.max
},crr)
console.log(brr) */
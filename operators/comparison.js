


/* valueof tostring
var arr = [1,2,3,4];
console.log(arr.valueOf(),arr.toString(),arr.valueOf().toString());
// [ 1, 2, 3, 4 ] '1,2,3,4' '1,2,3,4' */

/* 
var frr = function (){
    return '1,2,3,4'
}
console.log(frr.valueOf(),frr.toString(),frr.valueOf().toString());
// [Function: frr] 'function (){\r\n    return \'1,2,3,4\'\r\n}' 'function (){\r\n    return \'1,2,3,4\'\r\n}'
 */

/* 
var orr = {
    p : 1,
    a : 2,
    b : 3,
    c : 4
};
console.log(orr.valueOf(),orr.toString(),orr.valueOf().toString());
// { p: 1, a: 2, b: 3, c: 4 } '[object Object]' '[object Object]'
 */

/* ===
var arr = [1];
var brr = [1];
console.log(arr===brr,1===true); */

/* ==
console.log(
    1==true,
    undefined==undefined,
    null==null,
    undefined==null,
    ''==false,
    [1]==true,
); */
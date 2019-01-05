
/* var arr = [
    1,
    2,
    'abc',
    {p:1},
    function(){
        console.log(this.p);
    }
] */

/* var arr = ['a', 'b', 'c'];
arr.p = 1;
console.log(1 in arr); */

/* 遍历
var arr = [1,2,3];
for(let i=0;i<arr.length;i++){
    console.log(arr[i]);
} */

/* var n=0;
while(n<arr.length){
    console.log(arr[n]);
    n++;
} */
/* 
arr.forEach(
    function(a){
        console.log(a);
    }
) */

/* 空位
var a = [undefined, undefined, undefined,];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
}) */


/* 类似数组
function a(a,b){
    console.log(arguments[0],arguments instanceof  Array,'12'[1],'12' instanceof Array);
}
a(1,2); */

/* var a = 'abc';
var arr = Array.prototype.slice.call(a);
arr.forEach(element => {
    console.log(element);
}); */

/* 闭包
function Person(){
    var age
    function P(age1){
        age = age1
    }
    function getAge(){
        return age
    }
    return {
        p: P,
        getAge: getAge
    }
}
var p = Person();
p.p(12);
var age = p.getAge()
console.log(age)
 */

/* 字符串遍历
var aaa = '1321321'
Array.prototype.forEach.call(aaa,element => {
    console.log(element)
}) */




/* 递归
function fib(num) {
    if (num === 0) return 0;
    if (num === 1) return 1;
    return fib(num - 2) + fib(num - 1);
  } 
  console.log(fib(6)); // 8
  */
  


/* 函数
function add(x, y) {
    return x + y;
} */

/* function f(op){
    return op;
}
console.log(f(add)(1,2)); */

/* 块级作用域
function name(params) {
    if (true) {
        let x = 5;
      }
    console.log(x);
}
name(); */

/* 块级作用域
function a(){
    console.log(x);
    var x = 0;
}
a(); */



/* 函数的作用域
var a = 1;
var f = function(){
    console.log(a);
}
function ff(){
    var a=2;
    f();
}
ff(); */

/* 函数的作用域
var x = function () {
    console.log(a);
  };
  function y(f) {
    var a = 2;
    f();
  }
  y(x) */

/* 值传递和引用传递
var p = 1;
var a = function f(x){
    x = 2;
}
a(p);
console.log(p); */

/* 
var obj = { p:1};
var b = function (x){
    x.p = 2;
}
b(obj);
console.log(obj.p); */

/* arguments
var f = function(a,b,c){
    'use strict';
    arguments[0] = 3;
    return [(a+b+c),arguments.length];
}
console.log(f(1,2,3)); //6 */

/* 闭包
function a(x){
    var arr = 1;
    function b(){
        console.log(arr);
    }
    return {
        fb : b,
        brr : arr
    }
}
var brr = a();
console.log(brr.brr); */


/* function a(x){
    return function(){
        return x++;
    };
}
var arr = a(5);
console.log(arr());
console.log(arr());
console.log(arr()); */



/* function a(){
    var age;
    function getAge(){
        return age;
    }
    function setAge(a){
        age = a;
    }
    return {
        getage:getAge,
        setage:setAge
    }
}
var b = a();
b.setage(5);
console.log(b.getage()); */

/* 立即调用
(
    function a(x){
        var a = 2;
        console.log(x);
    }
)(5); */

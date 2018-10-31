# 函数

[demo](function.js)

## 概述

### 函数的声明

function  

```javascript
function f(s){
    console.log(s);
}
```

函数表达式  

```javascript
var f = function(s){
    console.log(s);
};
```

需要分号  

### 递归

斐波那契数列

```javascript
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

fib(6) // 8
```

### 第一等公民

> JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民

```javascript
function add(x, y) {
  return x + y;
}

// 将函数赋值给一个变量
var operator = add;

// 将函数作为参数和返回值
function a(op){
  return op;
}
a(add)(1, 1)
// 2
```

### 函数名提升

JavaScript 引擎将函数名视同变量名，所以采用function命令声明函数时，整个函数会像变量声明一样，被提升到代码头部

`f(); function f() {}`
`f(); var f = function (){};`  //报错

## 函数的属性和方法

### name

```javascript
function f1() {}
f1.name // "f1"

var f2 = function () {};
f2.name // "f2"

var myFunc = function () {};

function test(f) {
  console.log(f.name);
}

test(myFunc) // myFunc  获取参数函数的名字
```

### length

函数预期传入的参数个数，即函数定义之中的参数个数  
`function f(a, b) {}  f.length // 2`

### toString

返回一个字符串，内容是函数的源码  

```javascript
function f() {
  a();
  b();
  c();
}

f.toString()
// function f() {
//  a();
//  b();
//  c();
// }


//实现多行字符串
var multiline = function (fn) {
  var arr = fn.toString().split('\n');
  return arr.slice(1, arr.length - 1).join('\n');
};

function f() {/*
  这是一个
  多行注释
*/}

multiline(f);
// " 这是一个
//   多行注释"
```

## 函数作用域

Javascript 只有两种作用域：一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取；另一种是函数作用域，变量只在函数内部存在  

```javascript
var v = 1;

function f(){
  var v = 2;
  console.log(v);
}

f() // 2
v // 1


if (true) {
  var x = 5;
}
console.log(x);  // 5  块级作用域
```

### 函数内部变量提升

```javascript
function a(){
    console.log(x);
    var x = 0;
}
a(); //undefined
```

### 函数自己的作用域

作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关

```javascript
var a = 1;
var f = function(){
    console.log(a);
}
function ff(){
    var a=2;
    f();
}
ff();  //1

var x = function () {
  console.log(a);
};
function y(f) {
  var a = 2;
  f();
}
y(x)
// ReferenceError: a is not defined
```

## 参数

函数参数不是必需的，Javascript 允许省略参数

```javascript
function f(a, b) {
  return a;
}

f(1, 2, 3) // 1
f(1) // 1
f() // undefined

f.length // 2

function f(a, b) {
  return a;
}
f( , 1) // SyntaxError: Unexpected token ,(…)
f(undefined, 1) // undefined
```

### 值传递和引用传递

```javascript
var p = 2;

function f(p) {
  p = 3;
}
f(p);

p // 2

var obj = { p: 1 };

function f(o) {
  o.p = 2;
}
f(obj);

obj.p // 2
```

### 同名参数

如果有同名的参数，则取最后出现的那个值

```javascript
function f(a, a) {
  console.log(a);
}
f(1, 2) // 2
```

## arguments

- 由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数  

- 严格模式下，arguments对象是一个只读对象，修改它是无效的，但不会报错  

```javascript
var f = function(a,b,c){
    'use strict';
    arguments[0] = 3;
    return [(a+b+c),arguments.length];
}
console.log(f(1,2,3)); //6,3
```

- 虽然arguments很像数组，但它是一个对象。数组专有的方法（比如slice和forEach），不能在arguments对象上直接使用 ，变成数组：`var args = Array.prototype.slice.call(arguments);`

- arguments对象带有一个callee属性，返回它所对应的原函数

```javascript
var f = function () {
  console.log(arguments.callee === f);
}

f() // true
```

## 闭包

通过函数访问函数内部变量 

```javascript
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
brr.fb(); //1
console.log(brr.brr); //1
```

闭包作用域是函数内部，内存不释放

```javascript
function a(x){
    return function(){
        return x++;
    };
}
var arr = a(5);
console.log(arr()); //5
console.log(arr()); //6
console.log(arr()); //7
```

闭包-构造函数  

```javascript
function a(){
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
console.log(b.getage()); //5
```

## 立即调用函数

`(function(){ /* code */ })();`  
通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。  

***eval的本质是在当前作用域之中，注入代码。由于安全风险和不利于 JavaScript 引擎优化执行速度，所以一般不推荐使用。通常情况下，eval最常见的场合是解析 JSON 数据的字符串，不过正确的做法应该是使用原生的JSON.parse方法***

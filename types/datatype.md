# JS的数据类型

## 介绍

javascript的数据类型共有六种:

- 数值（[number](number.md)）：整数和小数
- 字符串（[string](string.md)）：文本
- 布尔值（[boolean](boolean.md)）：true和false
- [undefined](null-undefined.md)：未赋值或不存在
- [null](null-undefined.md)：空
- 对象([object](object.md)，[array](array.md)，[function](function.md))：集合

### typeof

```javascript
console.log(typeof 123);//number
console.log(typeof '123');//string
console.log(typeof false);//boolean
console.log(typeof {});//object
console.log(typeof []);//object
console.log(typeof [1,2,3]); //object
console.log(typeof function(){});//function
console.log(typeof null);//object
console.log(typeof undefined);//undefined
```

### 未定义和未赋值

```javascript
var arr;
console.log(arr===undefined);//true
console.log(typeof arr===undefined);//true
console.log(typeof v === "undefined");//true
```

## null undefined

### 特性

- boolean值都为false
- 相等运算符下，两者相等`undefined==null //true`
- Nunber转换不一样`Number(null)//0   Number(undefined)//NaN`

区别

```javascript
var i;
console.log(i);

function test(a,b){
    console.log(b);
}
test();

function test1(){

}
console.log(test1());

var o = {};
console.log(o.p);

//全部是undefined
```

### 惯例

对象现在不想赋值，可以赋给 null

非对象现在不想赋值，可以赋给undefined或者直接不赋值

## boolean

### 规则

运算符

- 前置逻辑运算符： ! (Not)
- 相等运算符：===,!==,==,!=
- 比较运算符：>，>=，<，<=

自动转为布尔值的时候，除了下面六个值被转为false，其他值都视为true

- undefined
- null
- false
- 0
- NaN
- ""或''（空字符串）

空数组和空对象的bool值为true

```javascript
console.log(Boolean({}));
console.log(Boolean([]));
//true
```

### 数组和对象

空数组（[]）和空对象（{}）对应的布尔值，都是true

```javascript
var arr = []
var obj = {}

if(arr){
    console.log(1) //1
}
if(obj){
    console.log(2) //2
}
if(arr.length===0){
    console.log("数组空")
}
if(Object.keys(obj).length===0){
    console.log("对象空")
}
```

## number

### 介绍

JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数） `1===1.0 //true`
浮点数不是精确的值 `0.1+0.2===0.3 //false`  `0.3/0.1 //2.9999999999999996`
精确范围：-2<sup>53</sup>到2<sup>53</sup>
数值范围：2<sup>1024</sup>到2<sup>-1075</sup>  

`Math.pow(2, 1024) // Infinity` `Math.pow(2, -1075) //5e-324` `Math.pow(2, -1076) //0`
`Number.MAX_VALUE // 1.7976931348623157e+308`
`Number.MIN_VALUE // 5e-324`  

### 进制

- 十进制：没有前导0的数值。
- 八进制：有前缀0o或0O的数值，或者有前导0、且只用到0-7的八个阿拉伯数字的数值。
- 十六进制：有前缀0x或0X的数值。
- 二进制：有前缀0b或0B的数值。

### 特殊数值

#### +0 和 -0

几乎所有场合，正零和负零都会被当作正常的0

```javascript
-0 === +0 // true
0 === -0 // true
0 === +0 // true
+0 // 0
-0 // 0
```

#### NaN:Not a Number

1. 字符串解析成数字出错  `5 - 'x' //NaN`
2. 数学函数的运算结果 `Math.sqrt(-1) //NaN`
3. 0除以0 `0 / 0 //NaN`
4. NaN是数值 `typeof NaN // 'number'`
5. NaN不等于任何值 `NaN === NaN //false`
6. NaN在布尔运算时被当作false  `Boolean(NaN) //false`
7. NaN与任何数（包括它自己）的运算，得到的都是NaN  `NaN + 32 //NaN`

#### Infinity

Infinity表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到Infinity  

```javascript
Math.pow(2, 1024) // Infinity
0 / 0 // NaN
1 / 0 // Infinity
Infinity === -Infinity // false
1 / -0 // -Infinity
-1 / -0 // Infinity
```

### 全局方法

parseInt()：用于将字符串转为整数
转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分  
如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN。

```javascript
parseInt('   81') // 81
parseInt('1.23') // 1
parseInt('8a') // 8
parseInt('12**') // 12
parseInt('15px') // 15
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512
parseInt('1000', 10) // 1000
parseInt([1,2,3]) //1
parseInt({}) //NaN
```

parseFloat()：用于将一个字符串转为浮点数

```javascript
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

isNaN()：用来判断一个值是否为NaN  

```javascript
isNaN(NaN) // true
isNaN(123) // false
isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true
isNaN({}) // true
// 等同于
isNaN(Number({})) // true
isNaN({}) // true
//判断NaN
function myIsNaN(value) {
  return value !== value;
}
```

isFinite()：表示某个值是否为正常的数值

```javascript
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```

## 字符串

### 概述

- 单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号

  `'key = "value"'` `"It's a long journey"`  

- 单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义

  `'Did she say \'Hello\'?'` `"Did she say \"Hello\"?"`  

- 字符串代码分行

  ```javascript
  var longString = 'Long \
  long \
  long \
  string';
  
  var longString = `Long 
  long 
  long 
  string`;
  ```

- 字符串可以被视为字符数组，因此可以使用数组的方括号运算符，但仅此而已

  ```javascript
  var s = 'hello';
  s[0] // "h"
  s[1] // "e"
  s[4] // "o"
  delete s[0];
  s // "hello"
  var s = 'hello';
  s.length // 5
  
  s.length = 3;
  s.length // 5
  ```

- 字符串遍历

  ```javascript
    var aaa = '1321321'
    Array.prototype.forEach.call(aaa,element => {
      console.log(element)
    })  
    Array.from(aaa).forEach(item=>{
      console.log(item)
    })
  ```

### 转义

- \0 ：null（\u0000）
- \b ：后退键（\u0008）
- \f ：换页符（\u000C）
- \n ：换行符（\u000A）
- \r ：回车键（\u000D）
- \t ：制表符（\u0009）
- \v ：垂直制表符（\u000B）
- \' ：单引号（\u0027）
- \" ：双引号（\u0022）
- \\ ：反斜杠（\u005C）

## 对象

- 对象的所有键名都是字符串，所以加不加引号都可以  
- 对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型  
- 不同的变量名指向同一个对象，那么它们都是这个对象的引用

```javascript
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a // 1

o2.b = 2;
o1.b // 2
```

### 属性的操作

#### 属性的读取

- 读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符

  ```javascript
  var obj = {
    p: 'Hello World'
  };
  
  obj.p // "Hello World"
  obj['p'] // "Hello World"
  ```

- 如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理  

- 方括号运算符内部还可以使用表达式  `obj['hello' + ' world']` `obj[3 + 3]`  

- 数字键可以不加引号，因为会自动转成字符串

  ```javascript
  var obj = {
    0.7: 'Hello World'
  };
  
  obj['0.7'] // "Hello World"
  obj[0.7] // "Hello World"
  ```

- 数值键名不能使用点运算符

  ```javascript
  var obj = {
    123: 'hello world'
  };
  
  obj.123 // 报错
  obj[123] // "hello world"
  ```

#### 属性的查看

```javascript
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```

#### 属性的删除

```javascript
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []
```

#### 属性是否存在

```javascript
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true

var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

#### 属性的遍历

```javascript
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

## 函数

### 概述

#### 函数的声明

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

#### 递归

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

### 函数的属性和方法

#### name

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

#### length

函数预期传入的参数个数，即函数定义之中的参数个数  
`function f(a, b) {}  f.length // 2`

#### toString

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

### 函数作用域

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

#### 函数内部变量提升

```javascript
function a(){
    console.log(x);
    var x = 0;
}
a(); //undefined
```

#### 函数自己的作用域

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

### 参数

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

#### 值传递和引用传递

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

#### 同名参数

如果有同名的参数，则取最后出现的那个值

```javascript
function f(a, a) {
  console.log(a);
}
f(1, 2) // 2

```

#### arguments

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

### 闭包

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

### 立即调用函数

`(function(){ /* code */ })();`  
通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。  

***eval的本质是在当前作用域之中，注入代码。由于安全风险和不利于 JavaScript 引擎优化执行速度，所以一般不推荐使用。通常情况下，eval最常见的场合是解析 JSON 数据的字符串，不过正确的做法应该是使用原生的JSON.parse方法***

## 数组

### 介绍

- 任何类型的数据，都可以放入数组  

```javascript
var arr = [
    1,
    2,
    'abc',
    {p:1},
    function(){
        console.log(this.p);
    }
]
```

- 数组属于一种特殊的对象,键名是按次序排列的一组整数

```javascript
typeof [1, 2, 3]  //"object"

var arr = ['a', 'b', 'c'];
Object.keys(arr)
//["0", "1", "2"]

arr['0'] // 'a'
arr[0] // 'a'

a[1.00] = 6;
a[1] // 6

arr.0 // SyntaxError
```

- length

length属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到length设置的值  

```javascript
var arr = [ 'a', 'b', 'c' ];
arr.length // 3

arr.length = 2;
arr // ["a", "b"]
arr.length = 0;
arr // []
```

如果人为设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位  
`var a = ['a']; a.length = 3; a[1] // undefined`

由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值  

`var a = []; a['p'] = 'abc'; a.length // 0 a[2.1] = 'abc'; a.length // 0`  

### in

```javascript
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false

var arr = [];
arr[100] = 'a';
100 in arr // true
1 in arr // false
```

### 数组遍历

*不要使用for in，它会把非数字键也遍历出来*

for  

```javascript
for(var i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```

while  

```javascript
var i = 0;
while (i < a.length) {
  console.log(a[i]);
  i++;
}
```

foreach  

```javascript
var colors = ['red', 'green', 'blue'];
colors.forEach(function (color) {
  console.log(color);
});
// red
// green
// blue
```

### 数组空位

- 当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位  

`var a = [1, , 1]; a.length // 3`  

- 如果最后一个元素后面有逗号，并不会产生空位  

`var a = [1, 2, 3,]; a.length // 3  a // [1, 2, 3]`

- 数组的空位是可以读取的，返回undefined  

`var a = [, , ,]; a[1] // undefined`  

- 遍历空位都会被跳过,是undefined遍历的时候就不会被跳过  

```javascript
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

var a = [undefined, undefined, undefined];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined
```

### 类似数组的对象

典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串  

```javascript
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false

```



```javascript
//通过call()，可以把forEach()嫁接到string上面调用
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c

//数组的slice方法可以将“类似数组的对象”变成真正的数组
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c

```

**嫁接方法比直接使用数组原生的forEach要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的forEach方法**
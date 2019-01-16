# 严格模式

'use strict'

严格模式是从 ES5 进入标准的，主要目的有以下几个。

- 明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。
- 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度。
- 为未来新版本的 JavaScript 语法做好铺垫。

总之，严格模式体现了 JavaScript 更合理、更安全、更严谨的发展方向

严格模式可以用于整个脚本，也可以只用于单个函数

## 显式报错
### 只读属性不可写
严格模式下，设置字符串的length属性，会报错
```javascript
'use strict';
'abc'.length = 5;
// TypeError: Cannot assign to read only property 'length' of string 'abc'

// 对只读属性赋值会报错
'use strict';
Object.defineProperty({}, 'a', {
  value: 37,
  writable: false
});
obj.a = 123;
// TypeError: Cannot assign to read only property 'a' of object #<Object>

// 删除不可配置的属性会报错
'use strict';
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  configurable: false
});
delete obj.p
// TypeError: Cannot delete property 'p' of #<Object>
```

严格模式下，对只读属性赋值，或者删除不可配置（non-configurable）属性都会报错

### 只设置了取值器的属性不可写
严格模式下，对一个只有取值器（getter）、没有存值器（setter）的属性赋值，会报错
```javascript
'use strict';
var obj = {
  get v() { return 1; }
};
obj.v = 2;
// Uncaught TypeError: Cannot set property v of #<Object> which has only a getter
```

### 禁止扩展的对象不可扩展
严格模式下，对禁止扩展的对象添加新属性，会报错
```javascript
'use strict';
var obj = {};
Object.preventExtensions(obj);
obj.v = 1;
// Uncaught TypeError: Cannot add property v, object is not extensible
```

### eval、arguments 不可用作标识名
严格模式下，使用eval或者arguments作为标识名，将会报错

### 函数不能有重名的参数
正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取。严格模式下，这属于语法错误

### 禁止八进制的前缀0表示法
正常模式下，整数的第一位如果是0，表示这是八进制数，比如0100等于十进制的64。严格模式禁止这种表示法，整数第一位为0，将报错
`var n = 0100; // Uncaught SyntaxError: Octal literals are not allowed in strict mode.`

## 增强的安全措施
### 全局变量显式声明
正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明
```javascript
function f() {
  x = 123;
}
f() // 报错，未声明就创建一个全局变量
```
### 禁止 this 关键字指向全局对象
正常模式下，函数内部的this可能会指向全局对象，严格模式禁止这种用法，避免无意间创造全局变量
```javascript
// 正常模式
function fun() {
  return this;
}

fun() // window
fun.call(2) // Number {2}
fun.call(true) // Boolean {true}
fun.call(null) // window
fun.call(undefined) // window

// 严格模式
'use strict';
function fun() {
  return this;
}

fun() //undefined
fun.call(2) // 2
fun.call(true) // true
fun.call(null) // null
fun.call(undefined) // undefined
```
### 禁止使用 fn.callee、fn.caller
函数内部不得使用fn.caller、fn.arguments，否则会报错。这意味着不能在函数内部得到调用栈了
### 禁止使用 arguments.callee、arguments.caller
arguments.callee和arguments.caller是两个历史遗留的变量，从来没有标准化过，现在已经取消了。
### 禁止删除变量
严格模式下无法删除变量，如果使用delete命令删除一个变量，会报错。只有对象的属性，且属性的描述对象的configurable属性设置为true，才能被delete命令删除
```javascript
'use strict';
var x;
delete x; // 语法错误

var obj = Object.create(null, {
  x: {
    value: 1,
    configurable: true
  }
});
delete obj.x; // 删除成功
```

## 静态绑定
严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，必须在编译阶段就确定。这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外

### 禁止使用 with 语句
严格模式下，使用with语句将报错。因为with语句无法在编译时就确定，某个属性到底归属哪个对象，从而影响了编译效果
### 创设 eval 作用域
正常模式下，JavaScript 语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval作用域
```javascript
(function () {
  'use strict';
  var x = 2;
  console.log(eval('var x = 5; x')) // 5
  console.log(x) // 2
})()
```
### arguments 不再追踪参数的变化
```javascript
function f(a) {
  a = 2;
  return [a, arguments[0]];
}
f(1); // 正常模式为[2, 2]

function f(a) {
  'use strict';
  a = 2;
  return [a, arguments[0]];
}
f(1); // 严格模式为[2, 1]
```

## 向下一个版本的 JavaScript 过渡

### 非函数代码块不得声明函数
```javascript
'use strict';
if (true) {
  function f1() { } // 语法错误
}

for (var i = 0; i < 5; i++) {
  function f2() { } // 语法错误
}
```
注意，如果是 ES6 环境，上面的代码不会报错，因为 ES6 允许在代码块之中声明函数

### 保留字
为了向将来 JavaScript 的新版本过渡，严格模式新增了一些保留字（implements、interface、let、package、private、protected、public、static、yield等）。使用这些词作为变量名将会报错
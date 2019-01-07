# 错误处理

[demo](error.js)

JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例

```javascript
var err = new Error('出错了');
err.message // "出错了"
```

- message：错误提示信息
- name：错误名称（非标准属性）
- stack：错误的堆栈（非标准属性）

## 原生错误类型

### SyntaxError

`var err = new Error'出错')`  // SyntaxError: Unexpected string

### ReferenceError

对象是引用一个不存在的变量时发生的错误，或将一个值分配给无法分配的对象，比如对函数的运行结果或者this赋值

`unknownVariable`  // Uncaught ReferenceError: unknownVariable is not defined

`this = 1` // ReferenceError: Invalid left-hand side in assignment

### RangeError

RangeError对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值

`new Array(-1)` // Uncaught RangeError: Invalid array length

### TypeError

TypeError对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数

```javascript
new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
```

### URIError

URIError对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数

### EvalError

eval函数没有被正确执行时，会抛出EvalError错误

以上这6种派生错误，连同原始的Error对象，都是构造函数。开发者可以使用它们，手动生成错误对象的实例。这些构造函数都接受一个参数，代表错误提示信息（message）

```javascript
var err1 = new Error('出错了！');
var err2 = new RangeError('出错了，变量超出有效范围！');
var err3 = new TypeError('出错了，变量类型无效！');

err1.message // "出错了！"
err2.message // "出错了，变量超出有效范围！"
err3.message // "出错了，变量类型无效！"
```

## 自定义错误

```javascript
function UserError(message) {
    this.message = message || '默认信息';
    this.name = 'UserError';
}
  
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

console.log(new UserError('出错').message)
```

## throw 语句

throw语句的作用是手动中断程序执行，抛出一个错误

对于 JavaScript 引擎来说，遇到throw语句，程序就中止了。引擎会接收到throw抛出的信息，可能是一个错误实例，也可能是其他类型的值

```javascript
var x=0
if(x<1){
    //throw new Error('数值范围错误')
    //throw new UserError('出错').message
    throw 123  //123
}
```

## try...catch

如果你不确定某些代码是否会报错，就可以把它们放在try...catch代码块之中，便于进一步对错误进行处理。
为了捕捉不同类型的错误，catch代码块之中可以加入判断语句。

```javascript
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

## finally

try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。

```javascript
function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log('FINALLY');
  }
}

idle('hello')
// hello
// FINALLY
```
return语句的执行是排在finally代码之前，只是等finally代码执行完毕后才返回

```javascript
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
//1
```

```javascript
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0 1 3
```
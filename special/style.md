# 编程风格

[demo](style.js)

## 缩进
Tab 键可以节省击键次数，但不同的文本编辑器对 Tab 的显示不尽相同，有的显示四个空格，有的显示两个空格，所以有人觉得，空格键可以使得显示效果更统一。

无论你选择哪一种方法，都是可以接受的，要做的就是始终坚持这一种选择。不要一会使用 Tab 键，一会使用空格键

## 区块

建议总是使用大括号表示区块

表示区块起首的大括号，不要另起一行
```javascript
return {
  key : value
};
```

## 圆括号

- 表示函数调用时，函数名与左括号之间没有空格。
- 表示函数定义时，函数名与左括号之间没有空格。
- 其他情况时，前面位置的语法元素与左括号之间，都有一个空格。

## 行尾的分号

分号表示一条语句的结束。JavaScript 允许省略行尾的分号。事实上，确实有一些开发者行尾从来不写分号。但是，由于下面要讨论的原因，建议还是不要省略这个分号

### 不使用分号的情况

for和while循环，if/switch/try，函数的声明语句

## 分号的自动添加

`var a = 1` 等同于 `var a = 1;` 这种语法特性被称为“分号的自动添加”（Automatic Semicolon Insertion，简称 ASI）

由于解释引擎自动添加分号的行为难以预测，因此编写代码的时候不应该省略行尾的分号。
不应该省略结尾的分号，还有一个原因。有些 JavaScript 代码压缩器（uglifier）不会自动添加分号，因此遇到没有分号的结尾，就会让代码保持原状，而不是压缩成一行，使得压缩无法得到最优的结果。

## 全局变量

JavaScript 最大的语法缺点，可能就是全局变量对于任何一个代码块，都是可读可写。这对代码的模块化和重复使用，非常不利。

因此，建议避免使用全局变量。如果不得不使用，可以考虑用大写字母表示变量名，这样更容易看出这是全局变量，比如UPPER_CASE

## 变量声明

JavaScript 会自动将变量声明”提升“（hoist）到代码块（block）的头部

```javascript
for (var i = 0; i < 10; i++) {
  // ...
}

// 写成
var i;
for (i = 0; i < 10; i++) {
  // ...
}
```

上面这样的写法，就容易看出存在一个全局的循环变量i。

另外，所有函数都应该在使用之前定义。函数内部的变量声明，都应该放在函数的头部

## with 语句 

不要使用with语句

## 相等和严格相等

建议不要使用相等运算符（==），只使用严格相等运算符（===）

## 语句的合并

建议不要将不同目的的语句，合并成一行

## 自增和自减运算符

建议自增（++）和自减（--）运算符尽量使用+=和-=代替

## switch...case 结构

switch...case结构要求，在每一个case的最后一行必须是break语句，否则会接着运行下一个case。这样不仅容易忘记，还会造成代码的冗长。

而且，switch...case不使用大括号，不利于代码形式的统一。此外，这种结构类似于goto语句，容易造成程序流程的混乱，使得代码结构混乱不堪，不符合面向对象编程的原则

```javascript
function doAction(action) {
  switch (action) {
    case 'hack':
      return 'hack';
    case 'slash':
      return 'slash';
    case 'run':
      return 'run';
    default:
      throw new Error('Invalid action.');
  }
}
替换为：
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },
    'slash': function () {
      return 'slash';
    },
    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
```
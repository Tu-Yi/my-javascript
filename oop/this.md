# this

this都有一个共同点：它总是返回一个对象

this就是属性或方法“当前”所在的对象

```javascript
function f() {
  return '姓名：'+ this.name;
}

var A = {
  name: '张三',
  describe: f
};

var B = {
  name: '李四',
  describe: f
};

A.describe() // "姓名：张三"
B.describe() // "姓名：李四"

//this始终指向当前
var name = 'kangkang'
var f = function() {
    return this.name;
}
console.log(f())  //undefined

var name = 'kangkang'
var f = function() {
    return name;
}
console.log(f())  //kangkang
```

## 实质

```javascript
var f = function () {
  console.log(this.x);
}

var x = 1;
var obj = {
  f: f,
  x: 2,
};

// 单独执行
f() // undefined

// obj 环境执行
obj.f() // 2
```

## 使用注意点

### 避免多层 this

由于this的指向是不确定的，所以切勿在函数中包含多层的this
```javascript
//第二层指向全局对象
var a = 2
var o = {
a: 1,
f1: function () {
    console.log(this.a);
    var f2 = function () {
    console.log(a);
    }();
}
}

console.log(o.f1())
//1
//2

var a = 2
var o = {
a: 1,
f1: function () {
    console.log(this.a);
    var that = this
    var f2 = function () {
    console.log(that.a);
    }();
}
}

console.log(o.f1())
//1
//1
```

### 避免数组处理方法中的 this
数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this
```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}

o.f()
// undefined a1
// undefined a2

//将this当作foreach方法的第二个参数，固定它的运行环境
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}

o.f()
// hello a1
// hello a2
```

### 避免回调函数中的 this
```javascript
var o = new Object();
o.f = function () {
  console.log(this === o);
}

// jQuery 的写法
$('#button').on('click', o.f);
//点击按钮以后，控制台会显示false。原因是此时this不再指向o对象，而是指向按钮的 DOM 对象
```

## 绑定 this 的方法
JavaScript 提供了call、apply、bind这三个方法，来切换/固定this的指向

### Function.prototype.call()

函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数

```javascript
var obj = {};

var f = function () {
return this;
};

console.log(f.call(obj) === obj)  // true
```
call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象
call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数
```javascript
function add(a, b) {
  return a + b;
}

add.call(this, 1, 2) // 3
```

call方法的一个应用是调用对象的原生方法
```javascript
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

### Function.prototype.apply()
apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数,该数组的所有成员依次作为参数，传入原函数。原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加
```javascript
function f(x, y){
  console.log(x + y);
}

f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2
```

**找出数组最大元素**
`var a = [10, 2, 4, 15, 9]; Math.max.apply(null, a) // 15`

**将数组的空元素变为undefined**
`Array.apply(null, ['a', ,'b']) // [ 'a', undefined, 'b' ]`

**转换类似数组的对象**
```javascript
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
```

**绑定回调函数的对象**
```javascript
var o = new Object();

o.f = function () {
  console.log(this === o);
}

var f = function (){
  o.f.apply(o);
  // 或者 o.f.call(o);
};

// jQuery 的写法
$('#button').on('click', f);
```

### Function.prototype.bind()
bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数
```javascript
var counter = {
count: 0,
inc: function () {
    this.count++;
}
};

var obj = {
count: 100
};
var func = counter.inc.call(obj);
func();
console.log(obj.count)

//bind还可以接受更多的参数，将这些参数绑定原函数的参数
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);
newAdd(5) // 20
```

**每一次返回一个新函数**
```javascript
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...
element.removeEventListener('click', listener);
```
**结合回调函数使用**
```javascript
var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};

function callIt(callback) {
  callback();
}

callIt(counter.inc.bind(counter));
counter.count // 1
```
上面代码中，callIt方法会调用回调函数。这时如果直接把counter.inc传入，调用时counter.inc内部的this就会指向全局对象。使用bind方法将counter.inc绑定counter以后，就不会有这个问题，this总是指向counter

某些数组方法可以接受一个函数当作参数。这些函数内部的this指向，很可能也会出错
```javascript
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  }
};

obj.print()
// 没有任何输出


obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this.name);
  }.bind(this));
};
```

**结合call方法使用**
```javascript
var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]
```




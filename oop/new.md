# 对象和new

## 构造函数
**构造函数就差不多是自定义的包装类**

JavaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构

```javascript
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```

原型链

```javascript
var Vehicle = function () {
  this.price = 1000;
};
var v = new Vehicle();
v
Vehicle {price: 1000}price: 1000__proto__: Object
v.__proto__ === Vehicle.prototype
true
Vehicle.prototype.__proto__ === Object.prototype
true
```

使用new命令时，它后面的函数依次执行下面的步骤。

- 创建一个空对象，作为将要返回的对象实例。
- 将这个空对象的原型，指向构造函数的prototype属性。
- 将这个空对象赋值给函数内部的this关键字。
- 开始执行构造函数内部的代码。

```javascript
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}

// 实例
var actor = _new(Person, '张三', 28);
```

如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象
```javascript
var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};

(new Vehicle()).price
// 2000
```

## Object.create() 创建实例对象
构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用Object.create()方法

```javascript
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```

原型链

```javascript
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};
var person2 = Object.create(person1);
person2.name
"张三"
person2.__proto__ === person1.prototype
false
person2.__proto__ === person1
true
person1.__proto__ === Object.prototype
true
```


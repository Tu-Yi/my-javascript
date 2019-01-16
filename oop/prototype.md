# 对象的继承

## 原型对象概述

```javascript
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

cat1.meow === cat2.meow
// false
```
cat1和cat2是同一个构造函数的两个实例，它们都具有meow方法。由于meow方法是生成在每个实例对象上面，所以两个实例就生成了两次。也就是说，每新建一个实例，就会新建一个meow方法。这既没有必要，又浪费系统资源，因为所有meow方法都是同样的行为，完全应该共享

这个问题的解决方法，就是 JavaScript 的原型对象（prototype）

## prototype 属性的作用
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```
原型对象上添加一个color属性，结果，实例对象都共享了该属性
原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上
```javascript
Animal.prototype.color = 'yellow';

cat1.color // "yellow"
cat2.color // "yellow"
```
实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。这就是原型对象的特殊之处
如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法
```javascript
cat1.color = 'black';

cat1.color // 'black'
cat2.color // 'yellow'
Animal.prototype.color // 'yellow'
```
总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象

## 原型链
如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的
Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null
`Object.getPrototypeOf(Object.prototype) // null`

读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）

注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链

### constructor 属性
prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数
`function P() {} P.prototype.constructor === P // true`

由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承
```javascript
function P() {}
var p = new P();

console.log(p.constructor === P) // true
console.log(p.constructor === P.prototype.constructor) // true
console.log(p.hasOwnProperty('constructor')) // false
```

constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的
有了constructor属性，就可以从一个实例对象新建另一个实例
```javascript
function Constr() {}
var x = new Constr();

var y = new x.constructor();
y instanceof Constr // true
```
constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true

// 更好的写法,只修改原型对象的方法，不改变constructor
C.prototype.method1 = function (...) { ... };
```

## instanceof 运算符
instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例
`v instanceof Vehicle // true`
// 等同于
`Vehicle.prototype.isPrototypeOf(v)`

instanceof运算符的一个用处，是判断值的类型
```javascript
var x = [1, 2, 3];
var y = {};
x instanceof Array // true
y instanceof Object // true
```
注意，instanceof运算符只能用于对象，不适用原始类型的值。
`var s = 'hello'; s instanceof String // false`

对于undefined和null，instanceOf运算符总是返回false
`undefined instanceof Object // false null instanceof Object // false`

利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题
```javascript
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```

## 构造函数的继承
让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数

```javascript
function Sub(value) {
  Super.call(this);
  this.prop = value;
}

//第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';


function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

function Rectangle(){
  Shape.call(this)
}
Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

var rec = new Rectangle()
rec.move(1,2)
```

## 多重继承

```javascript
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.world = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
```
子类S同时继承了父类M1和M2。这种模式又称为 Mixin（混入）

## 模块

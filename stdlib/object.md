# Object 对象

JavaScript 的所有其他对象都继承自Object对象，即那些对象都是Object的实例

对象可以直接调用共用属性区的方法

`obj.__proto__ === Object.prototype`

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-05-04_10-26-35.png)

Object对象的原生方法分成两类：**Object本身的方法与Object的实例方法**

Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象

如果参数为空（或者为undefined和null），Object()返回一个空对象

如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例

```javascript
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object // true

var obj = Object(1);
console.log(obj instanceof Object) // true
console.log(obj instanceof Number) // true

var obj = Object('foo');
console.log(obj instanceof Object) // true
console.log(obj instanceof String) // true

var obj = Object(true);
console.log(obj instanceof Object) // true
console.log(obj instanceof Boolean) // true
```

如果Object方法的参数是一个对象，它总是返回该对象，即不用转换

```javascript
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true

//判断变量是否是对象
function isObject(value) {
  return value === Object(value);
}
isObject([]) // true
isObject(true) // false
```

## Object 构造函数

Object构造函数的用法与工具方法很相似，几乎一模一样。使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象
虽然用法相似，但是Object(value)与new Object(value)两者的语义是不同的，Object(value)表示将value转成一个对象，new Object(value)则表示新生成一个对象，它的值是value

```javascript
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true

var obj = new Object(123);
obj instanceof Number // true
```

## Object 的静态方法 

### Object.keys()，Object.getOwnPropertyNames()

Object.keys方法和Object.getOwnPropertyNames方法都用来遍历对象的属性

Object.keys方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

Object.getOwnPropertyNames方法与Object.keys类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名

```javascript
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj) // ["p1", "p2"]

var obj = {
  p1: 123,
  p2: 456
};

Object.getOwnPropertyNames(obj) // ["p1", "p2"]
```

对于一般的对象来说，Object.keys()和Object.getOwnPropertyNames()返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果,Object.getOwnPropertyNames()会返回不可枚举的属性

由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替

```javascript
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj).length // 2
Object.getOwnPropertyNames(obj).length // 2
```

### 其他方法

- 对象属性模型的相关方法
Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
Object.defineProperty()：通过描述对象，定义某个属性。
Object.defineProperties()：通过描述对象，定义多个属性。
- 控制对象状态的方法
Object.preventExtensions()：防止对象扩展。
Object.isExtensible()：判断对象是否可扩展。
Object.seal()：禁止对象配置。
Object.isSealed()：判断一个对象是否可配置。
Object.freeze()：冻结一个对象。
Object.isFrozen()：判断一个对象是否被冻结。
- 原型链相关方法
Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
Object.getPrototypeOf()：获取对象的Prototype对象。

## Object 的实例方法-公共属性

除了静态方法，还有不少方法定义在Object.prototype对象。它们称为实例方法，所有Object的实例对象都继承了这些方法

Object实例对象的方法，主要有以下六个。

- Object.prototype.valueOf()：返回当前对象对应的值。
- Object.prototype.toString()：返回当前对象对应的字符串形式。
- Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
- Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
- Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
- Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。

### Object.prototype.valueOf()

valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身

valueOf方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法

自定义valueOf方法，就可以得到想要的结果

```javascript
var obj = new Object();
obj.valueOf() === obj // true

var obj = new Object();
1 + obj // "1[object Object]"

var obj = new Object();
obj.valueOf = function () {
  return 2;
};
1 + obj // 3
```

### Object.prototype.toString()

toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串

字符串[object Object]本身没有太大的用处，但是通过自定义toString方法，可以让对象在自动类型转换时，得到想要的字符串形式

数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法

```javascript
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"

var obj = new Object();

obj.toString = function () {
  return 'hello';
};

obj + ' ' + 'world' // "hello world"

[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

### toString() 的应用：判断数据类型

Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型
由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，所以为了得到类型字符串，最好直接使用Object.prototype.toString方法。通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型

`Object.prototype.toString.call(value)`

不同数据类型的Object.prototype.toString方法返回值如下。

- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments 对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error 对象：返回[object Error]。
- Date 对象：返回[object Date]。
- RegExp 对象：返回[object RegExp]。
- 其他对象：返回[object Object]。

利用这个特性，可以写出一个比typeof运算符更准确的类型判断函数

```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```

```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

### Object.prototype.toLocaleString()

Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式

这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值

```javascript
var person = {
  toString: function () {
    return 'Henry Norman Bethune';
  },
  toLocaleString: function () {
    return '白求恩';
  }
};

person.toString() // Henry Norman Bethune
person.toLocaleString() // 白求恩
```

目前，主要有三个对象自定义了toLocaleString方法。

- Array.prototype.toLocaleString()
- Number.prototype.toLocaleString()
- Date.prototype.toLocaleString()

### Object.prototype.hasOwnProperty()

Object.prototype.hasOwnProperty方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性

```javascript
var obj = {
  p: 123
};

obj.hasOwnProperty('p') // true
obj.hasOwnProperty('toString') // false
```


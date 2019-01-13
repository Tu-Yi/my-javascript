# 属性描述对象

## 概述

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息

```javascript
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供6个元属性。

1. value
   value是该属性的属性值，默认为undefined。  
2. writable
   writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。
3. enumerable
   enumerable是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。
4. configurable
   configurable是一个布尔值，表示可配置性，默认为true。如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。也就是说，configurable属性控制了属性描述对象的可写性。
5. get
   get是一个函数，表示该属性的取值函数（getter），默认为undefined。
6. set
   set是一个函数，表示该属性的存值函数（setter），默认为undefined。

## Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor()`方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名,只能用于对象自身的属性，不能用于继承的属性

```javascript
var obj = {p : 1}
console.log(Object.getOwnPropertyDescriptor(obj,'p'))
//{ value: 1, writable: true, enumerable: true, configurable: true }
```

## Object.getOwnPropertyNames() 和 Object.keys()

keys只能返回允许遍历的属性

```javascript
var obj = Object.defineProperties({}, {
    p1: { value: 1, enumerable: true },
    p2: { value: 2, enumerable: false }
  });
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.keys(obj))
//[ 'p1', 'p2' ]
//[ 'p1' ]
```

## Object.defineProperty()，Object.defineProperties()

`Object.defineProperty(object, propertyName, attributesObject)`

Object.defineProperty方法接受三个参数，依次如下。

object：属性所在的对象
propertyName：字符串，表示属性名
attributesObject：属性描述对象

```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.p // 123

obj.p = 246;
obj.p // 123
```
如果属性已经存在，Object.defineProperty()方法相当于更新该属性的属性描述对象

如果一次性定义或修改多个属性，可以使用Object.defineProperties()方法
```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"
```
注意，一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错

```javascript
var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute
```

Object.defineProperty()和Object.defineProperties()参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false


```javascript
var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

## Object.prototype.propertyIsEnumerable()

实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false

```javascript
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```

## 元属性

### value
```javascript
var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, 'p').value
// 123

Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
```
### writable
writable属性是一个布尔值，决定了目标属性的值（value）是否可以被改变
```javascript
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a // 37
obj.a = 25;
obj.a // 37
```
如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性
```javascript
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);

obj.foo = 'b';
obj.foo // 'a'

//有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', {
  value: 'b'
});

obj.foo // "b"
```

### enumerable
enumerable（可遍历性）返回一个布尔值，表示目标属性是否可遍历
具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性
- for..in循环
- Object.keys方法
- JSON.stringify方法

```javascript
var obj = {};

Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false
});

obj.x // 123

for (var key in obj) {
  console.log(key);
}
// undefined

Object.keys(obj)  // []
JSON.stringify(obj) // "{}"
```
注意，for...in循环包括继承的属性，Object.keys方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可遍历，可以使用Object.getOwnPropertyNames方法。

另外，JSON.stringify方法会排除enumerable为false的属性，有时可以利用这一点。如果对象的 JSON 格式输出要排除某些属性，就可以把这些属性的enumerable设为false


### configurable
configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。也就是说，configurable为false时，value、writable、enumerable和configurable都不能被修改了

```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

//至于value，只要writable和configurable有一个为false，就不允许改动
Object.defineProperty(obj, 'p', {value: 2})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {writable: true})
// TypeError: Cannot redefine property: p

//writable只有在false改为true会报错，true改为false是允许的


Object.defineProperty(obj, 'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {configurable: true})
// TypeError: Cannot redefine property: p
```
可配置性决定了目标属性是否可以被删除
```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 1, configurable: true },
  p2: { value: 2, configurable: false }
});

delete obj.p1 // true
delete obj.p2 // false

obj.p1 // undefined
obj.p2 // 2
```

### 存取器
存值函数称为setter，使用属性描述对象的set属性；取值函数称为getter，使用属性描述对象的get属性
一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值
```javascript
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});

obj.p // "getter"
obj.p = 123 // "setter: 123"

var obj = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  }
};

var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};

obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

## 控制对象状态

有时需要冻结对象的读写状态，防止对象被改变。JavaScript 提供了三种冻结方法，最弱的一种是Object.preventExtensions，其次是Object.seal，最强的是Object.freeze

### Object.preventExtensions()

Object.preventExtensions方法可以使得一个对象无法再添加新的属性
```javascript
var obj = new Object();
Object.preventExtensions(obj);

Object.defineProperty(obj, 'p', {
  value: 'hello'
});
// TypeError: Cannot define property:p, object is not extensible.

obj.p = 1;
obj.p // undefined
```

**Object.isExtensible()**
Object.isExtensible方法用于检查一个对象是否使用了Object.preventExtensions方法。也就是说，检查是否可以为一个对象添加属性

```javascript
var obj = new Object();

Object.isExtensible(obj) // true
Object.preventExtensions(obj);
Object.isExtensible(obj) // false
```

### Object.seal()
Object.seal方法使得一个对象既无法添加新属性，也无法删除旧属性

```javascript
var obj = { p: 'hello' };
Object.seal(obj);

delete obj.p;
obj.p // "hello"

obj.x = 'world';
obj.x // undefined
```
Object.seal实质是把属性描述对象的configurable属性设为false，因此属性描述对象不再能改变了
Object.seal只是禁止新增或删除属性，并不影响修改某个属性的值

**Object.isSealed()**
Object.isSealed方法用于检查一个对象是否使用了Object.seal方法
```javascript
var obj = { p: 'a' };

Object.seal(obj);
Object.isSealed(obj) // true
```

### Object.freeze()
Object.freeze方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量

```javascript
var obj = {
  p: 'hello'
};

Object.freeze(obj);

obj.p = 'world';
obj.p // "hello"

obj.t = 'hello';
obj.t // undefined

delete obj.p // false
obj.p // "hello"
```

**Object.isFrozen()**
Object.isFrozen方法用于检查一个对象是否使用了Object.freeze方法

### 局限性

上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性

```javascript
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
proto.t = 'hello';
obj.t
// hello

//一种解决方案是，把obj的原型也冻结住
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);

proto.t = 'hello';
obj.t // undefined
```
另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容

```javascript
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]
```
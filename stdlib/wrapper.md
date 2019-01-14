# 包装对象

所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象

```javascript
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"
v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```

Number、String和Boolean如果不作为构造函数调用（即调用时不加new），常常用于将任意类型的值转为数值、字符串和布尔值
`Number(123) // 123 String('abc') // "abc" Boolean(true) // true`

**这三个对象作为构造函数使用（带有new）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有new），可以将任意类型的值，转为原始类型的值**

## 实例方法

### valueOf() toString() 
valueOf方法返回包装对象实例对应的原始类型的值。
toString方法返回对应的字符串形式
```javascript
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true

new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
```

## 原始类型与实例对象的自动转换
原始类型的值，可以自动当作包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例
`var str = 'abc'; str.length // 3`

自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。
调用结束后，包装对象实例会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。如果要为字符串添加属性，只有在它的原型对象String.prototype上定义

```javascript
var arr = '123'
arr.p='234'
console.log(arr.p)
//undefined
var arr = '123'
var obj = new String(arr)
obj.p='234'
console.log(obj.p)
//234
```

## 自定义方法
除了原生的实例方法，包装对象还可以自定义方法和属性，供原始类型的值直接调用
```javascript
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double()
// 246
```
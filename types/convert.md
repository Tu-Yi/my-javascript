# JS 里的数据类型转换

javascript是一种动态类型语言，没法在编译阶段知道类型，必须等到运行时才能知道 



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_10-38-38.png)



### ![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_10-42-45.png)



## 强制转换

### Number(n) && parseInt && +n && n-0

```javascript
console.log(Number(123)) // 123
console.log(Number('123')) // 123
console.log(Number('123abc'))  // NaN
console.log(Number(true))  // 1
console.log(Number(false))  // 0
console.log(Number('')) // 0
console.log(Number(null))  // 0
console.log(Number('false'))  // NaN
console.log(Number(undefined))  // NaN
console.log(Number({}))  // NaN
console.log(Number([]))  // 0
console.log(Number([1,2,3]))  // NaN
console.log(Number({1:2}))  // NaN
console.log(Number([5]))  // 5
```

第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。

第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。

第三步，如果toString方法返回的是对象，就报错。

```javascript
console.log(Number('')) //0
console.log(Number(null)) //0
console.log(Number(undefined)) //NaN
console.log(Number([])) //0
console.log(Number({})) //NaN

console.log(parseInt('')) //NaN
console.log(parseInt(null)) //NaN
console.log(parseInt(undefined)) //NaN
console.log(parseInt([])) //NaN
console.log(parseInt({})) //NaN
```



### String(n) && n+''

- 数值：转为相应的字符串。
- 字符串：转换后还是原来的值。
- 布尔值：true转为字符串"true"，false转为字符串"false"。
- undefined：转为字符串"undefined"。
- null：转为字符串"null"。

String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式

```javascript
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

1. 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
2. 如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
3. 如果valueOf方法返回的是对象，就报错。

### Boolean(n) && !!n

转换规则相对简单：除了以下五个值的转换结果为false，其他的值全部为true。

**falsy值**

- undefined
- null
- -0或+0
- NaN
- ''（空字符串）

所有对象（包括空对象）的转换结果都是true，甚至连false对应的布尔对象new Boolean(false)也是true

```javascript
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

所有对象的布尔值都是true，这是因为 JavaScript 语言设计的时候，出于性能的考虑，如果对象需要计算才能得到布尔值，对于obj1 && obj2这样的场景，可能会需要较多的计算。为了保证性能，就统一规定，对象的布尔值为true。

```javascript
console.log(Boolean('')) //false
console.log(Boolean('   ')) //true
console.log(Boolean(null)) //false
console.log(Boolean(undefined)) //false
console.log(Boolean([])) //true
console.log(Boolean({})) //true
console.log(Boolean({name: 1})) //true

console.log(!!'') //false
console.log(!!'   ') //true
console.log(!!null) //false
console.log(!!undefined) //false
console.log(!![]) //true
console.log(!!{}) //true
console.log(!!{name: 1}) //true
```



## 自动转换

### 自动转换为布尔值

JavaScript 遇到预期为布尔值的地方（比如if语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用Boolean函数。

因此除了以下五个值，其他都是自动转为true。

- undefined
- null
- -0或+0
- NaN
- ''（空字符串）

### 自动转换为字符串

JavaScript 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串。

字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。

```javascript
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

### 自动转换为数值

JavaScript 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用Number函数。

除了加法运算符（+）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。

```javascript
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
```

一元运算符也会把运算子转成数值

```javascript
+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0
```
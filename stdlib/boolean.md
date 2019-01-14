# Boolean 对象

Boolean对象是 JavaScript 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例

```javascript
var b = new Boolean(true);

typeof b // "object"
b.valueOf() // true

//false对应的包装对象实例，布尔运算结果也是true
if (new Boolean(false)) {
  console.log('true');
} // true
if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出
```

## Boolean 函数的类型转换作用
```javascript
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false

Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
```
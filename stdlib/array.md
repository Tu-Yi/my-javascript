# Array对象

```javascript
// bad
var arr = new Array(1, 2);

// good
var arr = [1, 2];
```

## 静态方法

### Array.isArray()
Array.isArray方法返回一个布尔值，表示参数是否为数组。它可以弥补typeof运算符的不足

```javascript
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```

## 实例方法

### valueOf()，toString()
valueOf方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的valueOf方法不尽一致，数组的valueOf方法返回数组本身

`var arr = [1, 2, 3]; arr.valueOf() // [1, 2, 3]`

toString方法也是对象的通用方法，数组的toString方法返回数组的字符串形式
`var arr = [1, 2, 3]; arr.toString() // "1,2,3"`


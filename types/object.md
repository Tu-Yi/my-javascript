# 对象

[demo](object.js)

- 对象的所有键名都是字符串，所以加不加引号都可以  
- 对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型  
- 不同的变量名指向同一个对象，那么它们都是这个对象的引用

```javascript
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a // 1

o2.b = 2;
o1.b // 2
```

## 属性的操作

### 属性的读取

- 读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符

  ```javascript
  var obj = {
    p: 'Hello World'
  };

  obj.p // "Hello World"
  obj['p'] // "Hello World"
  ```

- 如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理  
- 方括号运算符内部还可以使用表达式  `obj['hello' + ' world']` `obj[3 + 3]`  
- 数字键可以不加引号，因为会自动转成字符串

  ```javascript
  var obj = {
    0.7: 'Hello World'
  };

  obj['0.7'] // "Hello World"
  obj[0.7] // "Hello World"
  ```

- 数值键名不能使用点运算符

  ```javascript
  var obj = {
    123: 'hello world'
  };

  obj.123 // 报错
  obj[123] // "hello world"
  ```

### 属性的查看

```javascript
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```

### 属性的删除

```javascript
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []
```

### 属性是否存在

```javascript
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true

var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

### 属性的遍历

```javascript
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
```


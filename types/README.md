# 数据类型

**本文引用代码：**[demo](demo.js)

## 介绍

javascript的数据类型共有六种:

- 数值（[number](number.md)）：整数和小数
- 字符串（[string](string.md)）：文本
- 布尔值（[boolean](boolean.md)）：true和false
- [undefined](null-undefined.md)：未赋值或不存在
- [null](null-undefined.md)：空
- 对象([object](object.md)，[array](array.md)，[function](function.md))：集合


## typeof

```javascript
console.log(typeof 123);//number
console.log(typeof '123');//string
console.log(typeof false);//boolean
console.log(typeof {});//object
console.log(typeof []);//object
console.log(typeof [1,2,3]); //object
console.log(typeof function(){});//function
console.log(typeof null);//object
console.log(typeof undefined);//undefined
```

### 未定义和未赋值

```javascript
var arr;
console.log(arr===undefined);//true
console.log(typeof arr===undefined);//true
console.log(typeof v === "undefined");//true
```


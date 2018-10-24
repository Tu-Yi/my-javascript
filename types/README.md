# 数据类型

**本文引用代码：**[demo](demo.js)

## 介绍

javascript的数据类型共有六种:

- 数值（number）：整数和小数
- 字符串（string）：文本
- 布尔值（boolean）：true和false
- undefined：未赋值或不存在
- null：空
- 对象(object，array，function)：集合

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

### 未定义和为赋值

```javascript
var arr;
console.log(arr===undefined);//true
console.log(typeof v === "undefined");//true
```
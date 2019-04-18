# boolean

[demo](boolean.js)

## 规则

运算符

- 前置逻辑运算符： ! (Not)
- 相等运算符：===,!==,==,!=
- 比较运算符：>，>=，<，<=

自动转为布尔值的时候，除了下面六个值被转为false，其他值都视为true

- undefined
- null
- false
- 0
- NaN
- ""或''（空字符串）

空数组和空对象的bool值为true

```javascript
console.log(Boolean({}));
console.log(Boolean([]));
//true
```

## 数组和对象

空数组（[]）和空对象（{}）对应的布尔值，都是true
```javascript
var arr = []
var obj = {}

if(arr){
    console.log(1) //1
}
if(obj){
    console.log(2) //2
}
if(arr.length===0){
    console.log("数组空")
}
if(Object.keys(obj).length===0){
    console.log("对象空")
}
```


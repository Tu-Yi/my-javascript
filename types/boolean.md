# boolean

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


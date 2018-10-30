# 数值

[demo](number.js)

## 介绍

JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数） `1===1.0 //true`
浮点数不是精确的值 `0.1+0.2===0.3 //false`  `0.3/0.1 //2.9999999999999996`
精确范围：-2<sup>53</sup>到2<sup>53</sup>
数值范围：2<sup>1024</sup>到2<sup>-1075</sup>  

`Math.pow(2, 1024) // Infinity` `Math.pow(2, -1075) //5e-324` `Math.pow(2, -1076) //0`
`Number.MAX_VALUE // 1.7976931348623157e+308`
`Number.MIN_VALUE // 5e-324`  

## 特殊数值

### +0 和 -0

几乎所有场合，正零和负零都会被当作正常的0

```javascript
-0 === +0 // true
0 === -0 // true
0 === +0 // true
+0 // 0
-0 // 0
```

### NaN:Not a Number

1. 字符串解析成数字出错  `5 - 'x' //NaN`
2. 数学函数的运算结果 `Math.sqrt(-1) //NaN`
3. 0除以0 `0 / 0 //NaN`
4. NaN是数值 `typeof NaN // 'number'`
5. NaN不等于任何值 `NaN === NaN //false`
6. NaN在布尔运算时被当作false  `Boolean(NaN) //false`
7. NaN与任何数（包括它自己）的运算，得到的都是NaN  `NaN + 32 //NaN`


### Infinity

Infinity表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到Infinity  

```javascript
Math.pow(2, 1024) // Infinity
0 / 0 // NaN
1 / 0 // Infinity
Infinity === -Infinity // false
1 / -0 // -Infinity
-1 / -0 // Infinity
```

## 全局方法

parseInt()：用于将字符串转为整数

```javascript
parseInt('   81') // 81
parseInt('1.23') // 1
parseInt('8a') // 8
parseInt('12**') // 12
parseInt('15px') // 15
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512
parseInt('1000', 10) // 1000
parseInt([1,2,3]) //1
parseInt({}) //NaN
```

parseFloat()：用于将一个字符串转为浮点数

```javascript
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

isNaN()：用来判断一个值是否为NaN  

```javascript
isNaN(NaN) // true
isNaN(123) // false
isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true
isNaN({}) // true
// 等同于
isNaN(Number({})) // true
isNaN({}) // true
//判断NaN
function myIsNaN(value) {
  return value !== value;
}
```

isFinite()：表示某个值是否为正常的数值

```javascript
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```


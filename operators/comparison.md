# 比较运算符

[demo](comparison.js)

JavaScript 一共提供了8个比较运算符。

- &gt; 大于运算符
- < 小于运算符
- <= 小于或等于运算符
- &gt;= 大于或等于运算符
- == 相等运算符
- === 严格相等运算符
- != 不相等运算符
- !== 严格不相等运算符

## 非相等运算符

字符串按照字典顺序进行比较 `'cat' > 'dog' // false '大' > '小' // false`
两个运算子都是原始类型的值，则是先转成数值再比较  

```javascript
5 > '4' // true
// 等同于 5 > Number('4')
// 即 5 > 4

true > false // true
// 等同于 Number(true) > Number(false)
// 即 1 > 0
```

任何值（包括NaN本身）与NaN比较，返回的都是false

```javascript
1 > NaN // false
1 <= NaN // false
'1' > NaN // false
'1' <= NaN // false
NaN > NaN // false
NaN <= NaN // false
```

如果运算子是对象，会转为原始类型的值，再进行比较,对象转换成原始类型的值，算法是先调用valueOf方法；如果返回的还是对象，再接着调用toString方法,不会先调用toString方法  

```javascript
var x = [2];
x > '11' // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () { return '1' };
x > '11' // false
// 等同于 [2].valueOf() > '11'
// 即 '1' > '11'

{ x: 2 } >= { x: 1 } // true
// 等同于 { x: 2 }.valueOf().toString() >= { x: 1 }.valueOf().toString()
// 即 '[object Object]' >= '[object Object]'
```

**valueOf and toString**

```javascript
var arr = [1,2,3,4];
console.log(arr.valueOf(),arr.toString(),arr.valueOf().toString());
// [ 1, 2, 3, 4 ] '1,2,3,4' '1,2,3,4'

var frr = function (){
    return '1,2,3,4'
}
console.log(frr.valueOf(),frr.toString(),frr.valueOf().toString());
// [Function: frr] 'function (){\r\n    return \'1,2,3,4\'\r\n}' 'function (){\r\n    return \'1,2,3,4\'\r\n}'

var orr = {
    p : 1,
    a : 2,
    b : 3,
    c : 4
};
console.log(orr.valueOf(),orr.toString(),orr.valueOf().toString());
// { p: 1, a: 2, b: 3, c: 4 } '[object Object]' '[object Object]'
```

## 严格相等和不相等运算符

如果两个值的类型不同，直接返回false  
`1 === "1" // false true === "true" // false`
`NaN === NaN  // false +0 === -0 // true`

两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址  

```javascript
{} === {} // false
[] === [] // false
(function () {} === function () {}) // false

var v1 = {};
var v2 = v1;
v1 === v2 // true
```

undefined 和 null
`undefined === undefined // true null === null // true`

## 相等运算符

原始类型的值会转换成数值再进行比较。

```javascript
1 == true // true
// 等同于 1 === Number(true)

0 == false // true
// 等同于 0 === Number(false)

2 == true // false
// 等同于 2 === Number(true)

2 == false // false
// 等同于 2 === Number(false)

'true' == true // false
// 等同于 Number('true') === Number(true)
// 等同于 NaN === 1

'' == 0 // true
// 等同于 Number('') === 0
// 等同于 0 === 0

'' == false  // true
// 等同于 Number('') === Number(false)
// 等同于 0 === 0

'1' == true  // true
// 等同于 Number('1') === Number(true)
// 等同于 1 === 1

'\n  123  \t' == 123 // true
// 因为字符串转为数字时，省略前置和后置的空格
```

对象与原始类型值比较 

```javascript
// 对象与数值比较时，对象转为数值
[1] == 1 // true
// 等同于 Number([1]) == 1

// 对象与字符串比较时，对象转为字符串
[1] == '1' // true
// 等同于 String([1]) == '1'
[1, 2] == '1,2' // true
// 等同于 String([1, 2]) == '1,2'

// 对象与布尔值比较时，两边都转为数值
[1] == true // true
// 等同于 Number([1]) == Number(true)
[2] == true // false
// 等同于 Number([2]) == Number(true)
```

undefined 和 null

```javascript
false == null // false
false == undefined // false

0 == null // false
0 == undefined // false

undefined == null // true
```

相等运算符的缺点  

```javascript
0 == ''             // true
0 == '0'            // true

2 == true           // false
2 == false          // false

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

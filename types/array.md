# 数组

[demo](array.js)

## 介绍

- 任何类型的数据，都可以放入数组  

```javascript
var arr = [
    1,
    2,
    'abc',
    {p:1},
    function(){
        console.log(this.p);
    }
]
```

- 数组属于一种特殊的对象,键名是按次序排列的一组整数

```javascript
typeof [1, 2, 3]  //"object"

var arr = ['a', 'b', 'c'];
Object.keys(arr)
//["0", "1", "2"]

arr['0'] // 'a'
arr[0] // 'a'

a[1.00] = 6;
a[1] // 6

arr.0 // SyntaxError
```

- length

length属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到length设置的值  

```javascript
var arr = [ 'a', 'b', 'c' ];
arr.length // 3

arr.length = 2;
arr // ["a", "b"]
arr.length = 0;
arr // []
```

如果人为设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位  
`var a = ['a']; a.length = 3; a[1] // undefined`

由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值  

`var a = []; a['p'] = 'abc'; a.length // 0 a[2.1] = 'abc'; a.length // 0`  

## in

```javascript
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false

var arr = [];
arr[100] = 'a';
100 in arr // true
1 in arr // false
```

## 数组遍历

*不要使用for in，它会把非数字键也遍历出来*

for  

```javascript
for(var i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```

while  

```javascript
var i = 0;
while (i < a.length) {
  console.log(a[i]);
  i++;
}
```

foreach  

```javascript
var colors = ['red', 'green', 'blue'];
colors.forEach(function (color) {
  console.log(color);
});
// red
// green
// blue
```

## 数组空位

- 当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位  

`var a = [1, , 1]; a.length // 3`  

- 如果最后一个元素后面有逗号，并不会产生空位  

`var a = [1, 2, 3,]; a.length // 3  a // [1, 2, 3]`

- 数组的空位是可以读取的，返回undefined  

`var a = [, , ,]; a[1] // undefined`  

- 遍历空位都会被跳过,是undefined遍历的时候就不会被跳过  

```javascript
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

var a = [undefined, undefined, undefined];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined
```

## 类似数组的对象

典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串  

```javascript
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```



```javascript
//通过call()，可以把forEach()嫁接到string上面调用
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c

//数组的slice方法可以将“类似数组的对象”变成真正的数组
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c
```

**嫁接方法比直接使用数组原生的forEach要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的forEach方法**
# Array对象

## 数组内存

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-05-17_20-36-01.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-05-17_20-39-36.png)

```javascript
var f = Array(3) //lenght
var a = Array(3,3) //值
f.__proto__ === Array.prototype
true

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

### push()，pop()

push方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组

```javascript
var arr = [];
arr.push(1) // 1
arr.push('a') // 2
arr.push(true, {}) // 4
arr // [1, 'a', true, {}]
```

pop方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组

`var arr = ['a', 'b', 'c']; arr.pop() // 'c'`

push和pop结合使用，就构成了“后进先出”的栈结构（stack）

```javascript
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr // [1, 2]
```

### shift()，unshift()

shift()方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组

`var a = ['a', 'b', 'c']; a.shift() // 'a'`

push()和shift()结合使用，就构成了“先进先出”的队列结构（queue）

unshift()方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度,注意，该方法会改变原数组

`var a = ['a', 'b', 'c']; a.unshift('x'); // 4`

### join()

join()方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔

```javascript
var a = [1, 2, 3, 4];

a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"

//通过call方法，这个方法也可以用于字符串或类似数组的对象
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"
var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```

### concat()

concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变

```javascript
var arr = [1,2,3,4,5]
var brr = arr.concat(6,7,8)
console.log(brr)

var a = [1,2,3]
var b = a.concat([])
console.log(b)  //[1,2,3]
a === b  //false
```

### reverse()

reverse方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组
`var a = ['a', 'b', 'c']; a.reverse() // ["c", "b", "a"]`

### slice()

slice方法用于提取目标数组的一部分，返回一个新数组，原数组不变
```javascript
var a = ['a', 'b', 'c'];

a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]
```

slice方法的一个重要应用，是将类似数组的对象转为真正的数组
```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

### splice()
splice方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组

splice的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素

```javascript
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]
```

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组
```javascript
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

### sort()
sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变
```javascript
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort()
// [10111, 1101, 111]


//如果想让sort方法按照自定义方式排序，可以传入一个函数作为参数
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]

[10111, 1101, 111].sort(function (a, b) {
  return b - a;
})
// [10111, 1101, 111]

[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

### map()
map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回

```javascript
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]

var arr = ['a', 'b', 'c'];
var brr = [1,2]
var crr = brr.map(function (e) {
  return this[e]
}, arr)
console.log(crr)  //[ 'b', 'c' ]
```

### forEach()
forEach方法与map方法很相似，也是对数组的所有成员依次执行参数函数。但是，forEach方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法

```javascript
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}
[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```
forEach方法也可以接受第二个参数，绑定参数函数的this变量
注意，forEach方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用for循环

**map和foreach都要注意this的绑定**

**foreach实现**

```javascript
var arr = ['a','b','c']
arr.ykEach = function(fn,obj){
    for(let i=0;i<this.length;i++){
        fn.call(obj,this[i],i)
    }
}
var brr=[]
arr.ykEach(function(value,key){
    console.log(this,value,key)
},brr)
//[] 'a' 0
//[] 'b' 1
//[] 'c' 2
```



```javascript
var arr = [1,2,3,4,5];
undefined
var out = [];
undefined
arr.forEach(function(elem) {
  console.log(this)
}, out);
```



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-05-04_10-59-26.png)

### filter()
filter方法用于过滤数组成员，满足条件的成员组成一个新数组返回,该方法不会改变原数组

```javascript
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]
```
filter方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组
```javascript
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]

//filter方法还可以接受第二个参数，用来绑定参数函数内部的this变量
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]
```

### some()，every()
这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件
some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false
every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false

```javascript
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true

var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```
注意，对于空数组，some方法返回false，every方法返回true，回调函数都不会执行


### reduce()，reduceRight()
reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员），其他完全一样

```javascript
[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15

//如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);
// 25

//由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, '');
}

findLongest(['aaa', 'bb', 'c']) // "aaa"
```

**reduce才是唯一的数组函数**

```javascript
// 代替filter
let a = [1,2,3,4,5,6,7,8,9,10]
let b = a.reduce((arr,n)=>{
    if(n%2===0){
        arr.push(n);
    }
    return arr;
},[])
console.log(b)  //[ 2, 4, 6, 8, 10 ]

//代替map
let a = [1,2,3,4,5,6,7,8,9,10]
let b = a.reduce((arr,n)=>{
    arr.push(n*2);
    return arr;
},[])
console.log(b)  
//[ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]
```


### indexOf()，lastIndexOf()

indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1
`var a = ['a', 'b', 'c']; a.indexOf('b') // 1 a.indexOf('y') // -1`


### 链式使用
上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用
```javascript
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(function (email) {
  console.log(email);
});
// "tom@example.com"
```
# JavaScript对象

## 全局对象 window

ECMAScript 规定全局对象叫做 global，但是浏览器把 window 作为全局对象（浏览器先存在的）

window 就是一个哈希表，有很多属性。

window 的属性就是全局变量。

这些全局变量分为两种：

1. 一种是 ECMAScript 规定的
   - global.parseInt
   - global.parseFloat
   - global.Number
   - global.String
   - global.Boolean
   - global.Object
2. 一种是浏览器自己加的属性
   - window.alert
   - window.prompt
   - window.comfirm
   - window.console.log
   - window.console.dir
   - window.document
   - window.document.createElement
   - window.document.getElementById

## 包装类

### Number

```javascript
var n1 = 1
var n2 = new Number(1)
console.log(n1) //1
console.log(n2) //[Number: 1]

console.log(n1.toString()) //"1"
console.log(n2.toString()) //"1"
```

n1之所以可以有toString方法，是因为javascript开辟了临时变量，调用了new Number(1)，这句话结束，临时变量就被销毁了，所以看下面

```javascript
n1.yk = 2
console.log(n1.yk) //undefined
```

### String

常用方法

```javascript
var s1 = '  hello  '
var s2 = 'world'

//字符串长度
console.log(s1.length) //9 包括空格
//根据索引获取字符
console.log(s2[1]) //o
//获取子字符串的索引，没有返回-1
console.log(s2.indexOf('rl')) //2
console.log(s2.indexOf('yk')) //-1
//检查字符串是否包含
console.log(s2.indexOf('ld')===-1) //false
console.log(s2.includes('wo')) //true  IE不支持
//去除头尾空格
console.log(s1.trim()) //hello
//连接
console.log(s1.trim().concat(s2)) //helloworld
//切片 不包含末尾
console.log(s2.slice(0,1)) //w
console.log(s2.slice(0,2))  //wo
//以字符分隔字符串，返回数组
console.log(s2.split('o')) //[ 'w', 'rld' ]
//替换
console.log(s2.replace('o','e')) //werld
//转换大小写
console.log(s2.toUpperCase()) //WORLD
//遍历字符串
Array.from(s2).forEach((s,i)=>{
    console.log(i+":"+s)
})
```

```javascript
var stringValue = "hello world";

console.log(stringValue.slice(3));          //”lo world”
console.log(stringValue.substring(3));      //”lo world”
console.log(stringValue.substr(3));        //”lo world”

console.log(stringValue.slice(3,7));         //”lo w”
console.log(stringValue.substring(3,7));    //”lo w”
console.log(stringValue.substr(3,7));       //”lo worl”

console.log(stringValue.slice(-3));         //"rld"　从后往前数3个开始
console.log(stringValue.substring(-3));     //"hello world" 为负，默认从0开始
console.log(stringValue.substr(-3));        //"rld"

console.log(stringValue.slice(3,-4));       //”lo w”　下标从3开始到-4(从后往前数4个)
console.log(stringValue.substring(3,-4));   //”hel”　
console.log(stringValue.substr(3,-4));      //””　长度为负，默认不显示
```

## 共有属性-原型-原型链

**角色：Object的静态方法区，包装类的静态方法区，对象，**

- 对象的的“proto”指向包装类的静态方法区，包装类的prototype也指向包装类的静态方法区

- 包装类的静态方法区中的“proto”指向Object的静态方法区，Object的prototype也指向Object的静态方法区

- Object的静态方法区中的“proto”指向null
- 对象.proto === 函数.prototype

**Function**

函数.proto === Function.prototype

Function.proto === Function.prototype

### Object

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-50-45.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-51-19.png)

### Number

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-56-05.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-56-45.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-59-52.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-591-52.png)



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_12-14-04.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_20-30-16.png)
# String 对象

## 静态方法
### String.fromCharCode()
String对象提供的静态方法（即定义在对象本身，而不是定义在对象实例的方法），主要是String.fromCharCode()。该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串
`String.fromCharCode(97) // "a"`

注意，该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）

## 实例属性
### String.prototype.length
字符串实例的length属性返回字符串的长度

## 实例方法
**String.prototype.charAt()**
charAt方法返回指定位置的字符，参数是从0开始编号的位置,
这个方法完全可以用数组下标替代
```javascript
var s = new String('abc');

s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"
```

**String.prototype.charCodeAt()**
charCodeAt方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作
`'abc'.charCodeAt(1) // 98`

**String.prototype.concat()**
concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串
```javascript
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"
```

**String.prototype.slice()**
slice方法用于从原字符串取出子字符串并返回，不改变原字符串,它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）
`'JavaScript'.slice(0, 4) // "Java"`
如果省略第二个参数，则表示子字符串一直到原字符串结束
`'JavaScript'.slice(4) // "Script"`

**String.prototype.substring()**
substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）
`'JavaScript'.substring(0, 4) // "Java"`
***由于一些规则违反直觉，因此不建议使用substring方法，应该优先使用slice***

**String.prototype.substr()**
substr方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同
substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度
`'JavaScript'.substr(4, 6) // "Script"`

**String.prototype.indexOf()，String.prototype.lastIndexOf()**
indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配
`'hello world'.indexOf('o') // 4 'JavaScript'.indexOf('script') // -1`
lastIndexOf方法的用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配

**String.prototype.trim()**
trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串
`'  hello world  '.trim() // "hello world"`
该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）

**String.prototype.toLowerCase()，String.prototype.toUpperCase()**
toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串
`'Hello World'.toLowerCase() // "hello world"`

**String.prototype.match()**
match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null
match方法还可以使用正则表达式作为参数
```javascript
console.log('cat, bat, sat, fat'.match('at'))
//[ 'f', index: 15, input: 'cat, bat, sat, fat', groups: undefined ]
```

**String.prototype.search()，String.prototype.replace()**
search方法的用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1
search方法还可以使用正则表达式作为参数
`'cat, bat, sat, fat'.search('at') // 1`

replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）
replace方法还可以使用正则表达式作为参数
`'aaa'.replace('a', 'b') // "baa"`

**String.prototype.split()**
split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组
split方法还可以使用正则表达式作为参数
`'a|b|c'.split('|') // ["a", "b", "c"]`

**String.prototype.localeCompare()**
localeCompare方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串
`'apple'.localeCompare('banana') // -1`



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


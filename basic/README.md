# 基本语法

**本文引用代码：**[demo](demo.js)

## 变量

- javascript的变量名区分大小写，A和a是两个不同的变量

- 声明变量而没有赋值，则该变量为`undefined`

  ```javascript
  var arr;
  console.log(arr);
  //undefined
  ```

- 没有声明就直接使用变量，javascript会报引用错误

  ```javascript
  console.log(x);//ReferenceError: x is not defined
  ```

- 同一条`var`中可声明多个变量

- 所有变量的声明语句，都会被提升到代码的头部，包括函数，这叫做变量提升

  ```javascript
  console.log(a);
  var a=1;
  //undefined
  ```
  *a的声明提到了前面，所以代码不会报错，赋值却托在了后面，所以是输出了为赋值的变量*

## 标识符

- 第一个字符，可以是任意 Unicode 字母（包括英文字母和其他语言的字母），以及美元符号（$）和下划线（_）
- 第二个字符及后面的字符，除了 Unicode 字母、美元符号和下划线，还可以用数字0-9
- 中文是合法的标识符 `var 变量 = 1`  
- javascript有一些保留字，不能用作标识符

  >arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield  

## 条件语句

### if

if后面的表达式之中，不要混淆赋值表达式（=）和相等运算符（==）
```javascript
var x = 1;
var y = 2;
if(x=y){
    console.log(x);
}
//2
```

  *并没有进行bool运算，而是把y的值赋给了x，代码不会报错，所以很容造成疏忽，很多开发者喜欢将常量写在运算符左边，这样一旦写错等号就会报错`if (2 = x) { // 报错`*

### switch

switch语句后面的表达式，与case语句后面的表示式比较运行结果时，采用的是严格相等运算符，这意味着比较时不会发生类型转换
```javascript
var a = 1;
switch(a){
    case true:
        console.log(1);
        break;
    default:
        console.log(0);
}
//0
```
### 三元运算符

*应用*
```javascript
var myVar;
var arr = myVar ? '1':'0';
console.log(arr);
//0
```
```javascript
var msg = '数字' + n + '是' + (n % 2 === 0 ? '偶数' : '奇数');
```
## 循环语句

### while
*例子*
```javascript
var i=0;
while(i<100){
    console.log(i);
    i++;
}
while (true) {
  console.log('Hello, world');
}//死循环
```
### for
*所有for循环，都可以改写成while循环*  
```javascript
for(var i=0;i<100;i++){
    console.log(i);
}
```

### do while
*无论如何都会执行一次*
```javascript
var i=0;
do{
    console.log(i);
    i++;
}while(i<0)
//0
```











# 其他运算符

[demo](priority.js)

## void 运算符

void运算符的作用是执行一个表达式，然后不返回任何值，或者说返回undefined  
`void 0 // undefined void(0) // undefined` 

```javascript
var x = 3;
void (x = 5) //undefined
x // 5

console.log(
    void(1+1),
    void(0),
    void 4 + 7,
    undefined + 7,
    'undefined'+7,
    null + 7,
);
// undefined undefined NaN NaN 'undefined7' 7
```

总是使用圆括号,因为void运算符的优先性很高，如果不使用括号，容易造成错误的结果  
`void 4 + 7 (void 4) + 7`  

超级链接中插入代码防止网页跳转，用户点击链接提交表单，但是不产生页面跳转  

```javascript
<a href="javascript: void(f())">文字</a>

<a href="javascript: void(document.form.submit())">
  提交
</a>
```

## 逗号运算符

逗号运算符用于对两个表达式求值，并返回后一个表达式的值  
逗号运算符的一个用途是，在返回一个值之前，进行一些辅助操作  

```javascript
console.log(
    ('a','b'),
); //b
var value = (console.log('hi'), true) //hi
```

## 运算顺序

`var y = arr.length <= 0 || arr[0] === undefined ? x : arr[0];`  
`var y = ((arr.length <= 0) || (arr[0] === undefined)) ? x : arr[0];`  
记住所有运算符的优先级，是非常难的，也是没有必要的  

运算符的优先级别十分繁杂，且都是硬性规定，因此建议总是使用圆括号，保证运算顺序清晰可读，这对代码的维护和除错至关重要  

圆括号不是运算符，而是一种语法结构。它一共有两种用法：一种是把表达式放在圆括号之中，提升运算的优先级；另一种是跟在函数的后面，作用是调用函数

### 左结合与右结合

少数运算符的计算顺序是从右到左，即从右边开始计算，这叫做运算符的“右结合”  

最主要的是赋值运算符（=），三元条件运算符（?:），指数运算符  

```javascript
w = x = y = z;
q = a ? b : c ? d : e ? f : g;

w = (x = (y = z));
q = a ? b : (c ? d : (e ? f : g));

2 ** 3 ** 2 //512
```


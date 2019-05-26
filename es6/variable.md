# 变量/赋值

## 变量
var 可以重复定义,不能限制修改，没有块级作用域
let 不能重复定义，变量，有块级作用域
const 不能重复定义，常量不能重新赋值，有块级作用域

**建议永远抛弃var**

```javascript
//重复赋值
var a = 1
a = 2
console.log(a) //2
let b = 1
b = 2
console.log(b)// 2
const c = 1
c = 2
console.log(c) // Assignment to constant variable

//重复定义
var a1 = 1
var a1 = 2
console.log(a)
let b1 = 1
let b1 = 2
console.log(b1) //Identifier 'b1' has already been declared
const c1 = 1
const c1 = 2
console.log(c1)//Identifier 'c1' has already been declared

//块级作用域
if(1){
    var a2 = 1
    let b2 = 1
    const c2 = 1
}
console.log(a2)
console.log(b2) // b2 is not defined
console.log(c2) // c2 is not defined

//let没有变量提升
function a(){
    console.log(arr)
    console.log(brr);
    let arr = 1;
    var brr = 1;
}
a();// arr is not defined

//const必须赋值
const a  //Uncaught SyntaxError: Missing initializer in const declaration
```



## 解构赋值
左右两边解构必须一样，右边必须是合法东西
左右两边赋值必须同步完成
```javascript
let [a,b,c] = [12,5,8]
let {a,b,c} = {a:12,b:5,c:8}

let [{a,b}] = [{"a":1,"b":2}]
console.log(a,b) //1,2

let [name,age] = ['niliv',3]
let p = {name,age}
console.log(p)
// {name: "niliv", age: 3}
 
let [n,{a,b},m] = [12,{a:1,b:2},12]
console.log(a,n,m,b)
let {a,b} = {1,2} //Unexpected token

let [o,p];
[o,p] = [1,2] //Missing initializer in destructuring declaration

let [x,y] = [1,2];  //数组后面必须分号
[x,y] = [y,x]

//默认值
let [c,b=2] = [3]
//c 3
//b 2

let [x,y=2] = [3,4]
//x 3
//y 4

let [m=2,n=3] = [undefined,null]
//m 2
//n null

let {x,y=5} = {x:1}
//x 1
//y 5

```





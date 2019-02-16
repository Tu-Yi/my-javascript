# 函数

## 箭头函数
1. 有且仅有1个参数，()可以省
2. 如果函数体只有一句话，而且是return，{}可以省
3. this
```javascript
let add = (a,b)=>{
    return a+b;
}
console.log(add(2,3)) //5

let add1 = (a,b)=>a+b
console.log(add1(2,3)) //5

let add2 = a=>a+2
console.log(add2(2)) // 4
```

## 默认参数
```javascript
let add3 = (a=1,b=2,c=3)=>a+b+c
console.log(add3()) //6
console.log(add3(2,3)) //8
```

## 参数展开
`function(a,b,...名字)`  名字自定义
剩余参数必须在参数列表的最后
```javascript
let add4 = (a,b,...args)=>{
    console.log(a,b,args)
}
add4(1,2,3,4,5,5,6,8)
// 1 2 [ 3, 4, 5, 5, 6, 8 ]

let add5 = (a,b,...args,c)=>{
    console.log(a,b,args,c)
} //Rest parameter must be last formal parameter
add4(1,2,3,4,5,5,6,8,111)
```
用途
- 接收剩余参数
- 展开数组
```javascript
let arr = [1,2,3]
let arr2 = [1,2,...arr,3]
console.log(arr2) //[ 1, 2, 1, 2, 3, 3 ]

function show1(...args){
    show2(...args)
}
function show2(a,b){
    console.log(a,b)
}
show1(1,2) //1,2
```

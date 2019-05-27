# 数组/json

## 数组
### 扩展
```javascript
var a=[1,2]
var b = [...a,3]
console.log(b) //1,2,3
```

### map,reduce,filter,forEach
都不会改变原数组
#### map 映射
```javascript
let arr = [1,2,3,43,5464,46,12]
let arr2 = arr.map(item=>item>=60)
console.log(arr2)
// [ false, false, false, false, true, false, false ]
```
#### filter 过滤
```javascript
let arr = [1,2,3,43,5464,46,12]
let arr2 = arr.filter(item=>item%2)
console.log(arr2) //[ 1, 3, 43 ]
```

#### forEach 遍历
```javascript
let arr = [1,2,3,43,5464,46,12]
let sum=0
arr.forEach(item=>{
    sum+=item
})
console.log(sum) //5571
```

#### reduce 汇总
```javascript
let arr = [1,2,3,43,5464,46,12]
let sum = arr.reduce((tmp,item,index)=>{
    return tmp+item
})
console.log(sum) //5571
```

### from

```javascript
let str = '123123'
Array.from(str).forEach(item=>console.log(item)) //123123
Array.prototype.slice.call(str).forEach(item=>console.log(item))
//123123

[...str].forEach(item=>console.log(item)) 
```

## json
简写
省略function

```javascript
let a = 1
let b = 2
let json_1 = {a,b}
console.log(json_1) //{ a: 1, b: 2 }

//对象里函数简写
let json_2 = {
    a : 1,
    b : 2,
    show(){
        console.log(a+b)
    }
}
json_2.show() //3
```




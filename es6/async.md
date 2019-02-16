# 异步

回调：完成通知你就是回调，优于轮询


## promise
用同步代码的方式去写异步代码

**一个请求**
```javascript
const host = 'http://localhost:8888/'
let p = new Promise((resolve,reject)=>{
    $.ajax({
        url: host+'list',
        dataType: 'json',
        success(json){
            resolve(json);
        },
        error(err){
            reject(err);
        }
    });
});
p.then(
json=>{
    alert('成功')
    console.log(json)
},
err=>{
    alert('失败')
    console.log(err)
});
```

**多个请求**
```javascript
let p = new Promise((resolve,reject)=>{
$.ajax({
    url: host+'list',
    dataType: 'json',
    success(json){
        resolve(json);
    },
    error(err){
        reject(err);
    }
});
});
let p1 = new Promise((resolve,reject)=>{
$.ajax({
    url: host+'getlunbo',
    dataType: 'json',
    success(json){
        resolve(json);
    },
    error(err){
        reject(err);
    }
});
});
let p2 = new Promise((resolve,reject)=>{
$.ajax({
    url: host+'newsList',
    dataType: 'json',
    success(json){
        resolve(json);
    },
    error(err){
        reject(err);
    }
});
});

Promise.all([p,p1,p2]).then(
arr=>{
let [j1,j2,j3] = arr;
alert('成功')
console.log(j1,j2,j3)
},
err=>{
alert('失败')
})
```

**Promise.all 与操作 所有的都成功 多个请求(最佳)**
```javascript
Promise.all([
    $.ajax({url: host+'list', dataType: 'json'}),
    $.ajax({url: host+'newsList', dataType: 'json'}),
    $.ajax({url: host+'getlunbo', dataType: 'json'})
]).then(
   arr=>{
    let [j1,j2,j3] = arr;
    console.log(j1,j2,j3);
}, err=>{
    alert('fail')
})
```
**Promise.race 或操作 只要一个成功 多个请求(最佳)**



1. promise解除异步操作
2. 局限：带逻辑的异步操作麻烦,后面请求需要依赖前面请求的，promise无效

## axios
```javascript
axios.defaults.baseURL = 'http://localhost:8888/'

axios.get('list')
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})

let q1 = axios.get('list');
let q2 = axios.get('getlunbo');
let q3 = axios.get('newsList');
axios.all([q1,q2,q3])
.then(axios.spread((req1,req2,req3)=>{
    console.log(req1,req2,req3)
}))
.catch(err=>{
    console.log(err)
})
```

## generator 生成器
能暂停
箭头函数没有生成器
```javascript
function *show(){
     console.log(1);
     let n = yield 55;
     console.log(2+n);
     return 66;
 }
let gen = show();
let res1 = gen.next();
console.log(res1)
let res2 = gen.next(12);
console.log(res2)

/* 1
{ value: 55, done: false }
14
{ value: 66, done: true } */
```

generator+promise配合
1. 外来的runner不统一
2. generator函数不能写成=>

解决请求的依赖
```javascript
function *show(){
    let data1 = yield $.ajax({url: host+'list', dataType: 'json'});
    if(data1.lenght>0){
        let data2 = yield $.ajax({url: host+'newsList', dataType: 'json'});
    }else{
        let data2 = yield $.ajax({url: host+'getlunbo', dataType: 'json'});
    }
}
runner(show);
```

## async/await

人类2019.1.1日：javascript异步终极解决方案
支持所有的函数，包括箭头函数，匿名函数
```javascript
async function show(){
    try{
        /* let data1 = await $.ajax({url: host+'list', dataType: 'json'});
        let data2 = await $.ajax({url: host+'getlunbo', dataType: 'json'});
        let data3 = await $.ajax({url: host+'newsList', dataType: 'json'}); */
        let data1 = await axios.get('list');
        let data2 = await axios.get('getlunbo');
        let data3 = await axios.get('newsList');
        console.log(data1,data2,data3);
    }catch(e){
        console.log(e);
    }
}
show();
```
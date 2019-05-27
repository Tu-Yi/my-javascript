# 字符串

## 字符串模板

```javascript
//植入变量
let obj = {
    name : 'yk',
    age : 12
}
let str = `我叫：${obj.name},年龄：${obj.age}`
console.log(str) //我叫：yk,年龄：12

//任意换行
let str2 = `<div>
    <p>hello</p>
</div>`
console.log(str2)
//<div><p>hello</p></div>
```

## startsWith endsWith
```javascript
if(str.startsWith('181')){
    return '电信'
}
```
# null 和 undefined

[demo](null-undefined.js)

## 特性

- boolean值都为false
- 相等运算符下，两者相等`undefined==null //true`
- Nunber转换不一样`Number(null)//0   Number(undefined)//NaN`

区别

```javascript
var i;
console.log(i);

function test(a,b){
    console.log(b);
}
test();

function test1(){

}
console.log(test1());

var o = {};
console.log(o.p);

//全部是undefined
```

## 惯例

对象现在不想赋值，可以赋给 null

非对象现在不想赋值，可以赋给undefined或者直接不赋值
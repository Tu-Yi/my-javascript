# 面向对象

## class语法糖

- class/constructor
- extends/super

```javascript
class Animal{
    constructor(name){
        this.name = name;
    }
    jiao(){
        console.log("动物:"+this.name + "叫")
    }
}
class Cat extends Animal{
    constructor(name,age){
        super(name)
        this.age = age
    }
    jiao(){
        console.log("猫:"+this.name + "叫")
    }
    cry(){
        console.log("猫哭了" + this.age)
    }
}
let c = new Cat("kitty",12)
c.jiao();
c.cry();
//猫:kitty叫 猫哭了
```




## this

bind--给函数定死一个this,防止js的this乱变
箭头函数：根据所在环境，this恒定
普通函数：根据调用，this老变

箭头函数对this的优先级高于bind

```javascript
let obj={a : 1}
let obj2 = {a : 2}
obj.show = function(){
    return this.a;
}
console.log(obj.show())
console.log(obj.show.bind(obj2)())
// 1 2

let arr = [1,2,3,4]
arr.a = ()=>{
    console.log(this)
}
arr.b = function(){
    console.log(this)
}
arr.a() //{}
arr.b() //[ 1, 2, 3, 4, a: [Function], b: [Function] ]
```
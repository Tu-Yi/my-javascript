# JavaScript对象 原型与原型链

## 全局对象 window

ECMAScript 规定全局对象叫做 global，但是浏览器把 window 作为全局对象（浏览器先存在的）

window 就是一个哈希表，有很多属性。window 的属性就是全局变量。

这些全局变量分为两种：

1. 一种是 ECMAScript 规定的
   - global.parseInt
   - global.parseFloat
   - global.Number
   - global.String
   - global.Boolean
   - global.Object
2. 一种是浏览器自己加的属性
   - window.alert
   - window.prompt
   - window.comfirm
   - window.console.log
   - window.console.dir
   - window.document
   - window.document.createElement
   - window.document.getElementById

## 共有属性-原型-原型链

**角色：Object的共有属性区，包装类的共有属性区，对象，**

- 对象的的“proto”指向包装类的共有属性区，包装类的prototype也指向包装类的共有属性区

- 包装类的共有属性区中的“proto”指向Object的共有属性区，Object的prototype也指向Object的共有属性区

- Object的共有属性区中的“proto”指向null
- 对象.proto === 函数.prototype

**Function**

函数.proto === Function.prototype

Function.proto === Function.prototype

### 原型的作用

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```

原型对象上添加一个color属性，结果，实例对象都共享了该属性
原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上

```javascript
Animal.prototype.color = 'yellow';

cat1.color // "yellow"
cat2.color // "yellow"
```

实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。这就是原型对象的特殊之处
如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法

```javascript
cat1.color = 'black';

cat1.color // 'black'
cat2.color // 'yellow'
Animal.prototype.color // 'yellow'
```

总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象

### 对象的原型

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-50-45.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-51-19.png)

### 原型链

如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的
Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null
`Object.getPrototypeOf(Object.prototype) // null`

读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）

注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-56-05.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-56-45.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-59-52.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_11-591-52.png)

### javascript初始化

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_12-14-04.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-30_20-30-16.png)


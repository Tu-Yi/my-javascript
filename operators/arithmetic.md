# 算术运算符

[demo](arithmetic.js)

javascript提供10个算术运算符  

- 加法运算符：x + y
- 减法运算符： x - y
- 乘法运算符： x * y
- 除法运算符：x / y
- 指数运算符：x ** y
- 余数运算符：x % y
- 自增运算符：++x 或者 x++
- 自减运算符：--x 或者 x--
- 数值运算符： +x
- 负数值运算符：-x

## 加法运算符

- JavaScript 允许非数值的相加  `true + true // 2 1 + true // 2`

- 两个字符串相加，这时加法运算符会变成连接运算符，返回一个新的字符串  

  `'a' + 'bc' // "abc"`

- 如果一个运算子是字符串，另一个运算子是非字符串，这时非字符串会转成字符串，再连接在一起

  `1 + 'a' // "1a" false + 'a' // "falsea"`
  `'3' + 4 + 5 // "345" 3 + 4 + '5' // "75"`

- 除了加法运算符，其他算术运算符（比如减法、除法和乘法）都不会发生重载。它们的规则是：所有运算子一律转为数值，再进行相应的数学运算  

  `1 - '2' // -1 1 * '2' // 2 1 / '2' // 0.5`

### undefined null

`undefined+7 //NaN null+7 //7`

### 对象相加

对象相加，首先，自动调用对象的valueOf方法，再自动调用对象的toString方法，对象的toString方法默认返回[object Object]  


```javascript
var obj = { p: 1 }; obj + 2 // "[object Object]2"

var obj = { p: 1 };
obj.valueOf() // { p: 1 }

var obj = { p: 1 };
obj.valueOf().toString() // "[object Object]"
```

可以自定义对象的valueOf和toString方法

```javascript

var a = {
    valueOf : function(){
        return 1;
    },
    toString : function(){
        return 'hello';
    }
}
console.log(a+'1');  //11

//如果运算子是一个Date对象的实例,那么会优先执行toString方法
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };

obj + 2 // "hello2"
```

## 余数运算符

```javascript
12 % 5 // 2

//运算结果的正负号由第一个运算子的正负号决定
-1 % 2 // -1
1 % -2 // 1
```

## 自增和自减运算符

自增和自减运算符有一个需要注意的地方，就是放在变量之后，会先返回变量操作前的值，再进行自增/自减操作；放在变量之前，会先进行自增/自减操作，再返回变量操作后的值

```javascript
var x=1,y=1;
console.log(x++); //1
console.log(++y); //2
```

## 数值运算符，负数值运算符

数值运算符的作用在于可以将任何值转为数值（与Number函数的作用相同）
`+true // 1 +[] // 0 +{} // NaN +'abc' //NaN;`

负数值运算符（-），也同样具有将一个值转为数值的功能，只不过得到的值正负相反。连用两个负数值运算符，等同于数值运算符  

## 指数运算符

指数运算符是右结合，而不是左结合。即多个指数运算符连用时，先进行最右边的计算  

```javascript
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

## 赋值运算符

```javascript
// 等同于 x = x + y
x += y

// 等同于 x = x - y
x -= y

// 等同于 x = x * y
x *= y

// 等同于 x = x / y
x /= y

// 等同于 x = x % y
x %= y

// 等同于 x = x ** y
x **= y
```

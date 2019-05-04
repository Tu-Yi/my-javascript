# Number 对象

```javascript
var n1 = 1
var n2 = new Number(1)
console.log(n1) //1
console.log(n2) //[Number: 1]

console.log(n1.toString()) //"1"
console.log(n2.toString()) //"1"
```

n1之所以可以有toString方法，是因为javascript开辟了临时变量，调用了new Number(1)，这句话结束，临时变量就被销毁了，所以看下面

```javascript
n1.yk = 2
console.log(n1.yk) //undefined
```



## 静态属性
Number对象拥有以下一些静态属性（即直接定义在Number对象上的属性，而不是定义在实例上的属性）。

- Number.POSITIVE_INFINITY：正的无限，指向Infinity。
- Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。
- Number.NaN：表示非数值，指向NaN。
- Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。
- Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
- Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。

## 实例方法

### Number.prototype.toString()

```javascript
(10).toString() // "10"
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```

### Number.prototype.toFixed()
toFixed方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串
`(10).toFixed(2) // "10.00" 10.005.toFixed(2) // "10.01"`
toFixed方法的参数为小数位数，有效范围为0到20，超出这个范围将抛出 RangeError 错误

### Number.prototype.toExponential()
toExponential方法用于将一个数转为科学计数法形式
`(10).toExponential()  // "1e+1"`

### Number.prototype.toPrecision()
toPrecision方法用于将一个数转为指定位数的有效数字
```javascript
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"
```

## 自定义方法
数值的自定义方法，只能定义在它的原型对象Number.prototype上面，数值本身是无法自定义属性的

```javascript
Number.prototype.add = function (x) {
  return this + x;
};

8['add'](2) // 10
```
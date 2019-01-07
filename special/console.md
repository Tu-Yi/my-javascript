# console对象和控制台

[demo](console.js)

## 静态方法

### console.log()，console.info()，console.debug()

console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出,console.log方法会自动在每次输出的结尾，添加换行符

```javascript
console.log('Hello World')
// Hello World
console.log('a', 'b', 'c')
// a b c
console.log(1);
console.log(2);
console.log(3);
// 1
// 2
// 3
```

如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出

`console.log(' %s + %s = %s', 1, 1, 2)`  //  1 + 1 = 2

console.log方法支持以下占位符，不同类型的数据必须使用对应的占位符。

- %s 字符串
- %d 整数
- %i 整数
- %f 浮点数
- %o 对象的链接
- %c CSS 格式字符串

```javascript
var number = 11 * 9;
var color = 'red';

console.log('%d %s balloons', number, color);
// 99 red balloons
```
如果参数是一个对象，console.log会显示该对象的值

```javascript
console.log({foo: 'bar'})
// Object {foo: "bar"}
console.log(Date)
// function Date() { [native code] }
```

console.info是console.log方法的别名，用法完全一样。只不过console.info方法会在输出信息的前面，加上一个蓝色图标。

console对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义console.log方法

```javascript
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！
```

使用%c占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行 CSS 渲染

```javascript
console.log(
  '%cThis text is styled!',
  'color: red; background: yellow; font-size: 24px;'
)
```

### console.warn()，console.error()

warn方法和error方法也是在控制台输出信息，它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样

```javascript
console.error('Error: %s (%i)', 'Server is not responding', 500)
// Error: Server is not responding (500)
console.warn('Warning! Too few nodes (%d)', document.childNodes.length)
// Warning! Too few nodes (1)
```

### console.table()  console.count()
console.table()将复合数据转换为表格
```javascript
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

console.table(languages);
```
![](http://jtc-img.oss-cn-shenzhen.aliyuncs.com/19-1-7/15481578.jpg)

count方法用于计数，输出它被调用了多少次,该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类

```javascript
 function greet(user) {
    //console.count();
    console.count(user);
    return 'hi ' + user;
  }
  
  greet('bob')
  //  : 1
  // "hi bob"
  
  greet('alice')
  //  : 2
  // "hi alice"
  
  greet('bob')
  //  : 3
  // "hi bob"
```

### console.dir()，console.dirxml()

dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示
该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性

```javascript
console.log({f1: 'foo', f2: 'bar'})
// Object {f1: "foo", f2: "bar"}

console.dir({f1: 'foo', f2: 'bar'})
// Object
//   f1: "foo"
//   f2: "bar"
//   __proto__: Object
```

dirxml方法主要用于以目录树的形式，显示 DOM 节点
`console.dirxml(document.body)`
如果参数不是 DOM 节点，而是普通的 JavaScript 对象，console.dirxml等同于console.dir

### console.assert()
console.assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确

它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果

```javascript
var x = 0
if(x<1){
    console.assert(false,'范围错误')
}
console.log(x)
//Assertion failed: 防伪错误
//0
```

### console.time()，console.timeEnd()

这两个方法用于计时，可以算出一个操作所花费的准确时间

```javascript
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
//Array initialize: 2795.761ms
```

### console.trace()，console.clear()

console.trace方法显示当前执行的代码在堆栈中的调用路径

```javascript
console.trace()
// console.trace()
//   (anonymous function)
//   InjectedScript._evaluateOn
//   InjectedScript._evaluateAndWrap
//   InjectedScript.evaluate
```

console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行

## debugger

debugger语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到debugger语句时会自动停下。如果没有除错工具，debugger语句不会产生任何结果，JavaScript 引擎自动跳过这一句
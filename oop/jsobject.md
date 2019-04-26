# JavaScript对象

## 全局对象 window

ECMAScript 规定全局对象叫做 global，但是浏览器把 window 作为全局对象（浏览器先存在的）

window 就是一个哈希表，有很多属性。

window 的属性就是全局变量。

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
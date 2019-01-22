# NodeList 接口，HTMLCollection 接口

DOM 提供两种节点集合，用于容纳多个节点：NodeList和HTMLCollection
主要区别是，NodeList可以包含各种类型的节点，HTMLCollection只能包含 HTML 元素节点

## NodeList
`document.body.childNodes instanceof NodeList // true`
NodeList实例很像数组，可以使用length属性和forEach方法。但是，它不是数组，不能使用pop或push之类数组特有的方法
```javascript
var children = document.body.childNodes;

Array.isArray(children) // false

children.length // 34
children.forEach(console.log)

var children = document.body.childNodes;
var nodeArr = Array.prototype.slice.call(children);
```
NodeList 实例children不是数组，但是具有length属性和forEach方法
NodeList 实例可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，DOM 删除或新增一个相关节点，都会立刻反映在 NodeList 实例。目前，只有Node.childNodes返回的是一个动态集合，其他的 NodeList 都是静态集合

**NodeList.prototype.length**
`document.querySelectorAll('xxx').length // 0`

**NodeList.prototype.forEach()**
```javascript
var children = document.body.childNodes;
children.forEach(function f(item, i, list) {
  // ...
}, this);
```

**NodeList.prototype.item()**
item方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员
`document.body.childNodes.item(0)`
所有类似数组的对象，都可以使用方括号运算符取出成员。一般情况下，都是使用方括号运算符，而不使用item方法
`document.body.childNodes[0]`


**NodeList.prototype.keys()，NodeList.prototype.values()，NodeList.prototype.entries()**
这三个方法都返回一个 ES6 的遍历器对象，可以通过for...of循环遍历获取每一个成员的信息。区别在于，keys()返回键名的遍历器，values()返回键值的遍历器，entries()返回的遍历器同时包含键名和键值的信息

## HTMLCollection 接口
与NodeList接口不同，HTMLCollection没有forEach方法，只能使用for循环遍历
HTMLCollection实例都是动态集合，节点的变化会实时反映在集合中
返回HTMLCollection实例的，主要是一些Document对象的集合属性，比如document.links、docuement.forms、document.images等
HTMLCollection.prototype.length
HTMLCollection.prototype.item()
HTMLCollection.prototype.namedItem()


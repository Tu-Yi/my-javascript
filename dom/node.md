# node

所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础


## 属性

**Node.prototype.nodeType**
nodeType属性返回一个整数值，表示节点的类型

不同节点的nodeType属性值和对应的常量如下。

- 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
- 元素节点（element）：1，对应常量Node.ELEMENT_NODE
- 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
- 文本节点（text）：3，对应常量Node.TEXT_NODE
- 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
- 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
- 注释节点（Comment）：8，对应常量Node.COMMENT_NODE

```javascript
var node = document.documentElement.firstChild;
if (node.nodeType === Node.ELEMENT_NODE) {
  console.log('该节点是元素节点');
}
```

**Node.prototype.nodeName**
nodeName属性返回节点的名称
`var div = document.getElementById('d1'); div.nodeName // "DIV"`

不同节点的nodeName属性值如下。

- 文档节点（document）：#document
- 元素节点（element）：大写的标签名
- 属性节点（attr）：属性的名称
- 文本节点（text）：#text
- 文档片断节点（DocumentFragment）：#document-fragment
- 文档类型节点（DocumentType）：文档的类型
- 注释节点（Comment）：#comment

**Node.prototype.nodeValue**
nodeValue属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。同样的，也只有这三类节点可以设置nodeValue属性的值，其他类型的节点设置无效。
```javascript
// HTML 代码如下
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeValue // null
div.firstChild.nodeValue // "hello world"
```

**Node.prototype.textContent**
textContent属性返回当前节点和它的所有后代节点的文本内容
```javascript
// HTML 代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById('divA').textContent
// This is some text
```
textContent属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容
该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容
`document.getElementById('foo').textContent = '<p>GoodBye!</p>';`
上面代码在插入文本时，会将<p>标签解释为文本，而不会当作标签处理

**Node.prototype.baseURI**
baseURI属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读
`document.baseURI`

**Node.prototype.ownerDocument**
Node.ownerDocument属性返回当前节点所在的顶层文档对象，即document对象
`var d = p.ownerDocument; d === document // true`

**Node.prototype.nextSibling**
Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回null
```javascript
// HTML 代码如下
// <div id="d1">hello</div><div id="d2">world</div>
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');

d1.nextSibling === d2 // true

//nextSibling属性可以用来遍历所有子节点
var el = document.getElementById('div1').firstChild;

while (el !== null) {
  console.log(el.nodeName);
  el = el.nextSibling;
}
```
注意，该属性还包括文本节点和注释节点（<!-- comment -->）。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格


**Node.prototype.previousSibling**
previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null
注意，该属性还包括文本节点和注释节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格

**Node.prototype.parentNode**
parentNode属性返回当前节点的父节点
文档节点（document）和文档片段节点（documentfragment）的父节点都是null

**Node.prototype.parentElement**
parentElement属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null
由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。parentElement属性相当于把后两种父节点都排除了

**Node.prototype.firstChild，Node.prototype.lastChild**
firstChild属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null
```javascript
// HTML 代码如下
// <p id="p1"><span>First span</span></p>
var p1 = document.getElementById('p1');
p1.firstChild.nodeName // "SPAN"

// HTML 代码如下
// <p id="p1">
//   <span>First span</span>
//  </p>
var p1 = document.getElementById('p1');
p1.firstChild.nodeName // "#text"
```
firstChild返回的除了元素节点，还可能是文本节点或注释节点
p元素与span元素之间有空白字符，这导致firstChild返回的是文本节点

**Node.prototype.childNodes**
childNodes属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点
`var children = document.querySelector('ul').childNodes;`
除了元素节点，childNodes属性的返回值还包括文本节点和注释节点。如果当前节点不包括任何子节点，则返回一个空的NodeList集合。由于NodeList对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中

**Node.prototype.isConnected**
isConnected属性返回一个布尔值，表示当前节点是否在文档之中


## 方法

**Node.prototype.appendChild()**
appendChild方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点
`var p = document.createElement('p'); document.body.appendChild(p);`
如果参数节点是 DOM 已经存在的节点，appendChild方法会将其从原来的位置，移动到新位置

**Node.prototype.hasChildNodes()**
hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点
注意，子节点包括所有类型的节点，并不仅仅是元素节点。哪怕节点只包含一个空格，hasChildNodes方法也会返回true

**Node.prototype.cloneNode()**
cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点

`var cloneUL = document.querySelector('ul').cloneNode(true);`

该方法有一些使用注意点。

（1）克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on-属性（即node.onclick = fn），添加在这个节点上的事件回调函数。

（2）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如Node.appendChild这样的方法添加到文档之中。

（3）克隆一个节点之后，DOM 有可能出现两个有相同id属性（即id="xxx"）的网页元素，这时应该修改其中一个元素的id属性。如果原节点有name属性，可能也需要修改。

**Node.prototype.insertBefore()**
insertBefore方法用于将某个节点插入父节点内部的指定位置
`var insertedNode = parentNode.insertBefore(newNode, referenceNode);`
insertBefore方法接受两个参数，第一个参数是所要插入的节点newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode。newNode将插在referenceNode这个子节点的前面。返回值是插入的新节点newNode

如果insertBefore方法的第二个参数为null，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点
`var p = document.createElement('p');document.body.insertBefore(p, null);`

由于不存在insertAfter方法，如果新节点要插在父节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟
`parent.insertBefore(s1, s2.nextSibling);`

**Node.prototype.removeChild()**
removeChild方法接受一个子节点作为参数，用于从当前节点移除该子节点
`var divA = document.getElementById('A');divA.parentNode.removeChild(divA);`

**Node.prototype.replaceChild()**
replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点
`var replacedNode = parentNode.replaceChild(newChild, oldChild);`
replaceChild方法接受两个参数，第一个参数newChild是用来替换的新节点，第二个参数oldChild是将要替换走的子节点。返回值是替换走的那个节点oldChild

**Node.prototype.contains()**
contains方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。

- 参数节点为当前节点。
- 参数节点为当前节点的子节点。
- 参数节点为当前节点的后代节点

**Node.prototype.compareDocumentPosition()**
compareDocumentPosition方法的用法，与contains方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系

**Node.prototype.isEqualNode()，Node.prototype.isSameNode()**
isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同
isSameNode方法返回一个布尔值，表示两个节点是否为同一个节点
```javascript
var p1 = document.createElement('p');
var p2 = document.createElement('p');

p1.isSameNode(p2) // false
p1.isSameNode(p1) // true
```

**Node.prototype.normalize()**
normailize方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点

**Node.prototype.getRootNode()**
getRootNode()方法返回当前节点所在文档的根节点document，与ownerDocument属性的作用相同


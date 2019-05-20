# dom

### dom概述

<https://wangdoc.com/javascript/dom/general.html>

### node

<https://wangdoc.com/javascript/dom/node.html>

[nodeType](<https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType>)



`childNodes,firstChild,innerText,lastChild,nextSibling,nodeName,nodeType,nodeValue,outerText,ownerDocument,parentElement,parentNode,previousSibling,textContent`

#### 属性    互相结合

- child 会获取到文本 / children / parent
- node
- first / last
- next / previous
- sibling / siblings  会获取到文本
- type
- value / text / content
- inner / outer  innertext 会清空里面的html然后赋值
- element

#### 方法

- appendChild()
- cloneNode()  传入true拷贝子元素，不传只拷贝当前元素
- contains()
- hasChildNodes()
- insertBefore()
- isEqualNode() ==
- isSameNode() ===
- removeChild() 仍然在内存中
- replaceChild() 
- normalize() // 常规化



**创建文本节点**

`div.appendChild(document.createTextNode("hello world"))`

**html节点**

`document.documentElement.nodeName`     "HTML"
**svg**
`document.body.children[0].nodeName`   "svg"

**textContent**

设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容

`document.getElementById('foo').textContent = '<p>GoodBye!</p>';`

innerText 会触发重排，赋值也会重排，最好用textContent



#### nodelist HTMLCollection

**只有`Node.childNodes`返回的是一个动态集合，其他的 NodeList 都是静态集合**

<https://wangdoc.com/javascript/dom/nodelist.html>



#### ParentNode 接口，ChildNode 接口

<https://wangdoc.com/javascript/dom/parentnode.html>



### Document

<https://wangdoc.com/javascript/dom/document.html>



**属性**

- anchors  弃用
- body
- characterSet
- childElementCount   子元素数量
- children
- doctype
- documentElement  html
- domain
- fullscreen  
- head
- hidden
- images
- links   获取所有a标签
- location   url
- onxxxxxxxxx
- origin
- plugins
- readyState
- referrer    引荐者  防止盗图 服务器判断请求中的referrer，可以是上一个页面，也可以使图片所在页面
- scripts
- scrollingElement
- styleSheets
- title
- visibilityState



**方法**

- close()
- createDocumentFragment()

`DocumentFragment`是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为`DocumentFragment`不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现

- createElement()
- createTextNode()   这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击
- execCommand()   拷贝  <https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand>
- exitFullscreen()
- getElementById()
- getElementsByClassName()
- getElementsByName()
- getElementsByTagName()
- getSelection()
- hasFocus()
- open()
- querySelector()
- querySelectorAll()  伪数组
- registerElement()
- write()   少用  open write close  有异步回调会重新写入，容易冲掉页面
- writeln()



### Element接口

<https://wangdoc.com/javascript/dom/element.html>

<https://developer.mozilla.org/zh-CN/docs/Web/API/Element>



### 属性

<https://wangdoc.com/javascript/dom/attributes.html>



### Text节点 DocumentFragment

<https://wangdoc.com/javascript/dom/text.html>



### CSS操作

<https://wangdoc.com/javascript/dom/css.html>



### Mutation Observer API

<https://wangdoc.com/javascript/dom/mutationobserver.html>
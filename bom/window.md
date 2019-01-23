# window 对象

浏览器里面，window对象（注意，w为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性

window有自己的实体含义，其实不适合当作最高一层的顶层对象，这是一个语言的设计失误。最早，设计这门语言的时候，原始设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者 Brendan Eich 就把window对象当作顶层对象，所有未声明就赋值的变量都自动变成window对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了

## window 对象的属性
**window.name**
```javascript
window.name = 'Hello World!';
console.log(window.name)
// "Hello World!"
```
window.name属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的target属性使用
只要浏览器窗口不关闭，这个属性是不会消失的。举例来说，访问a.com时，该页面的脚本设置了window.name，接下来在同一个窗口里面载入了b.com，新页面的脚本可以读到上一个网页设置的window.name。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了
**window.closed，window.opener**
window.closed属性返回一个布尔值，表示窗口是否关闭
window.opener属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回null
如果两个窗口之间不需要通信，建议将子窗口的opener属性显式设为null，这样可以减少一些安全隐患
```javascript
var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
newWin.opener = null;
```
通过opener属性，可以获得父窗口的全局属性和方法，但只限于两个窗口同源的情况，且其中一个窗口由另一个打开。`<a>`元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险
`<a href="https://an.evil.site" target="_blank" rel="noopener">恶意网站</a>`
**window.self，window.window**
window.self和window.window属性都指向窗口本身。这两个属性只读
**window.frames，window.length**
window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。window.frames[0]表示页面中第一个框架窗口
window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0
**window.frameElement**
window.frameElement属性主要用于当前窗口嵌在另一个网页的情况（嵌入`<object>、<iframe>或<embed>`元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回null
```javascript
// HTML 代码如下
// <iframe src="about.html"></iframe>

// 下面的脚本在 about.html 里面
var frameEl = window.frameElement;
if (frameEl) {
  frameEl.src = 'other.html';
}
```
**window.top，window.parent**
window.top属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口
window.parent属性指向父窗口。如果当前窗口没有父窗口，window.parent指向自身
**window.status**
window.status属性用于读写浏览器状态栏的文本。但是，现在很多浏览器都不允许改写状态栏文本，所以使用这个方法不一定有效
**window.devicePixelRatio**
window.devicePixelRatio属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片
**位置大小属性**
**组件属性**
**全局对象属性**
**window.isSecureContext**

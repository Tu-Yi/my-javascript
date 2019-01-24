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

（1）window.screenX，window.screenY
window.screenX和window.screenY属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读

（2） window.innerHeight，window.innerWidth
window.innerHeight和window.innerWidth属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读

（3）window.outerHeight，window.outerWidth
window.outerHeight和window.outerWidth属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读

（4）window.scrollX，window.scrollY
window.scrollX属性返回页面的水平滚动距离，window.scrollY属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读

（5）window.pageXOffset，window.pageYOffset
window.pageXOffset属性和window.pageYOffset属性，是window.scrollX和window.scrollY别名

**组件属性**
组件属性返回浏览器的组件对象。这样的属性有下面几个。

- window.locationbar：地址栏对象
- window.menubar：菜单栏对象
- window.scrollbars：窗口的滚动条对象
- window.toolbar：工具栏对象
- window.statusbar：状态栏对象
- window.personalbar：用户安装的个人工具栏对象

**全局对象属性**
全局对象属性指向一些浏览器原生的全局对象。

- window.document：指向document对象，注意，这个属性有同源限制。只有来自同源的脚本才能读取这个属性。
- window.location：指向Location对象，用于获取当前窗口的 URL 信息。它等同于document.location属性
- window.navigator：指向Navigator对象，用于获取环境信息
- window.history：指向History对象，表示浏览器的浏览历史
- window.localStorage：指向本地储存的 localStorage 数据
- window.sessionStorage：指向本地储存的 sessionStorage 数据
- window.console：指向console对象，用于操作控制台
- window.screen：指向Screen对象，表示屏幕信息

**window.isSecureContext**
window.isSecureContext属性返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，就是true，否则就是false

## window 对象的方法
### window.alert()，window.prompt()，window.confirm()
这三个方法弹出的对话框，都是浏览器统一规定的式样，无法定制

**window.alert()**
window.alert()方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息,window.alert()方法的参数只能是字符串，没法使用 CSS 样式，但是可以用\n指定换行
`window.alert('Hello World'); alert('本条提示\n分成两行');`

**window.prompt()**
window.prompt()方法弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据
`var result = prompt('您的年龄？', 25)`
上面代码会跳出一个对话框，文字提示为“您的年龄？”，要求用户在对话框中输入自己的年龄（默认显示25）。用户填入的值，会作为返回值存入变量result
window.prompt()的返回值有两种情况，可能是字符串（有可能是空字符串），也有可能是null。具体分成三种情况。

- 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
- 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
- 用户点击了“取消”（或者按了 ESC 按钮），则返回值是null。

window.prompt()方法的第二个参数是可选的，但是最好总是提供第二个参数，作为输入框的默认值

**window.confirm()**
window.confirm()方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意
`var result = confirm('你最近好吗？');`
confirm方法返回一个布尔值，如果用户点击“确定”，返回true；如果用户点击“取消”，则返回false

### window.open(), window.close()，window.stop()
**window.open()**
window.open方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回null
`var popup = window.open('somefile.html');`
open方法一共可以接受三个参数
- url：字符串，表示新窗口的网址。如果省略，默认网址就是about:blank。
- windowName：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。另外还有几个预设值，_self表示当前窗口，_top表示顶层窗口，_parent表示上一层窗口。
- windowFeatures：字符串，内容为逗号分隔的键值对（详见下文），表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 UI 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。
```javascript
var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);
```

**window.close()**
window.close方法用于关闭当前窗口，一般只用来关闭window.open方法新建的窗口

**window.stop()**
window.stop()方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象

### window.moveTo()，window.moveBy()
window.moveTo()方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素
`window.moveTo(100, 200)`
window.moveBy方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素
`window.moveBy(25, 50)`
为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：该窗口是用window.open方法新建的，并且它所在的 Tab 页是当前窗口里面唯一的。除此以外的情况，使用上面两个方法都是无效的

### window.resizeTo()，window.resizeBy()
window.resizeTo()方法用于缩放窗口到指定大小。
它接受两个参数，第一个是缩放后的窗口宽度（outerWidth属性，包含滚动条、标题栏等等），第二个是缩放后的窗口高度（outerHeight属性）
```javascript
window.resizeTo(
  window.screen.availWidth / 2,
  window.screen.availHeight / 2
)
```
window.resizeBy()方法用于缩放窗口。它与window.resizeTo()的区别是，它按照相对的量缩放，window.resizeTo()需要给出缩放后的绝对大小

### window.scrollTo()，window.scroll()，window.scrollBy()
window.scrollTo方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标
window.scrollBy()方法用于将网页滚动指定距离

### window.print()
window.print方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同

### window.focus()，window.blur()
window.focus()方法会激活窗口，使其获得焦点，出现在其他窗口的前面
window.blur()方法将焦点从窗口移除

### window.getSelection()
window.getSelection方法返回一个Selection对象，表示用户现在选中的文本

### window.getComputedStyle()，window.matchMedia()
window.getComputedStyle()方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象
window.matchMedia()方法用来检查 CSS 的mediaQuery语句

### window.requestAnimationFrame()
window.requestAnimationFrame()方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。

如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率

### window.requestIdleCallback()
window.requestIdleCallback()跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用window.requestIdleCallback()将其推迟执行，以保证网页性能。

它跟window.requestAnimationFrame()的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成；window.requestIdleCallback()可以保证回调函数在系统资源空闲时执行

## 事件
### load 事件和 onload 属性
load事件发生在文档在浏览器窗口加载完毕时。window.onload属性可以指定这个事件的回调函数
```javascript
window.onload = function() {
  var elements = document.getElementsByClassName('example');
  for (var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    // ...
  }
};
```

### error 事件和 onerror 属性
浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数
```javascript
window.onerror = function (message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};
```

### window 对象的事件监听属性
除了具备元素节点都有的 GlobalEventHandlers 接口，window对象还具有以下的事件监听函数属性
- window.onafterprint：afterprint事件的监听函数。
- window.onbeforeprint：beforeprint事件的监听函数。
- window.onbeforeunload：beforeunload事件的监听函数。
- window.onhashchange：hashchange事件的监听函数。
- window.onlanguagechange: languagechange的监听函数。
- window.onmessage：message事件的监听函数。
- window.onmessageerror：MessageError事件的监听函数。
- window.onoffline：offline事件的监听函数。
- window.ononline：online事件的监听函数。
- window.onpagehide：pagehide事件的监听函数。
- window.onpageshow：pageshow事件的监听函数。
- window.onpopstate：popstate事件的监听函数。
- window.onstorage：storage事件的监听函数。
- window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
- window.onunload：unload事件的监听函数。

## 多窗口操作
由于网页可以使用iframe元素，嵌入其他网页，因此一个网页之中会形成多个窗口。如果子窗口之中又嵌入别的网页，就会形成多级窗口

### 窗口的引用
各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。

- top：顶层窗口，即最上层的那个窗口
- parent：父窗口
- self：当前窗口，即自身

`window.parent.history.back();`

### iframe 元素
对于iframe嵌入的窗口，document.getElementById方法可以拿到该窗口的 DOM 节点，然后使用contentWindow属性获得iframe节点包含的window对象
`var frame = document.getElementById('theFrame');var frameWindow = frame.contentWindow;`

上面代码中，frame.contentWindow可以拿到子窗口的window对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性

`<iframe>`元素的contentDocument属性，可以拿到子窗口的document对象
```javascript
var frame = document.getElementById('theFrame');
var frameDoc = frame.contentDocument;

// 等同于
var frameDoc = frame.contentWindow.document
```
`<iframe>`元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用window.postMessage方法

`<iframe>`窗口内部，使用window.parent引用父窗口。如果当前页面没有父窗口，则window.parent属性返回自身。因此，可以通过window.parent是否等于window.self，判断当前窗口是否为iframe窗口
`if (window.parent !== window.self) {// 当前窗口是子窗口}`

`<iframe>`窗口的window对象，有一个frameElement属性，返回`<iframe>`在父窗口中的 DOM 节点。对于非嵌入的窗口，该属性等于null

### window.frames 属性
window.frames属性返回一个类似数组的对象，成员是所有子窗口的window对象。可以使用这个属性，实现窗口之间的互相引用。比如，frames[0]返回第一个子窗口，frames[1].frames[2]返回第二个子窗口内部的第三个子窗口，parent.frames[1]返回父窗口的第二个子窗口




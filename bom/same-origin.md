# 同源限制
浏览器安全的基石是“同源政策”（same-origin policy）

## 概述
1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。

最初，它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页“同源”。所谓“同源”指的是“三个相同”

- 协议相同
- 域名相同
- 端口相同

举例来说，http://www.example.com/dir/page.html这个网址，协议是http://，域名是www.example.com，端口是80（默认端口可以省略），它的同源情况如下。

- http://www.example.com/dir2/other.html：同源
- http://example.com/dir/other.html：不同源（域名不同）
- http://v2.www.example.com/dir/other.html：不同源（域名不同）
- http://www.example.com:81/dir/other.html：不同源（端口不同）
- https://www.example.com/dir/page.html：不同源（协议不同）

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想这样一种情况：A 网站是一家银行，用户登录以后，A 网站在用户的机器上设置了一个 Cookie，包含了一些隐私信息（比如存款总额）。用户离开 A 网站以后，又去访问 B 网站，如果没有同源限制，B 网站可以读取 A 网站的 Cookie，那么隐私信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，同源政策是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了

随着互联网的发展，同源政策越来越严格。目前，如果非同源，共有三种行为受到限制

（1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。

（2） 无法接触非同源网页的 DOM。

（3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

通过 JavaScript 脚本可以拿到其他窗口的window对象。如果是非同源的网页，目前允许一个窗口可以接触其他网页的window对象的九个属性和四个方法

- window.closed
- window.frames
- window.length
- window.location
- window.opener
- window.parent
- window.self
- window.top
- window.window
- window.blur()
- window.close()
- window.focus()
- window.postMessage()

只有window.location是可读写的，其他八个全部都是只读。而且，即使是location对象，非同源的情况下，也只允许调用location.replace方法和写入location.href属性


## Cookie
Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置document.domain共享 Cookie

举例来说，A 网页的网址是http://w1.example.com/a.html，B 网页的网址是http://w2.example.com/b.html，那么只要设置相同的document.domain，两个网页就可以共享 Cookie。因为浏览器通过document.domain属性来检查是否同源

`// 两个网页都需要设置 document.domain = 'example.com';`

注意，A 和 B 两个网页都需要设置document.domain属性，才能达到同源的目的。因为设置document.domain的同时，会把端口重置为null，因此如果只设置一个网页的document.domain，会导致两个网址的端口不同，还是达不到同源的目的

`// A 网页通过脚本设置一个 Cookie document.cookie = "test1=hello";`
`//B 网页就可以读到这个 Cookie。  var allCookie = document.cookie;`

注意，这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexedDB 无法通过这种方法

另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如.example.com
`Set-Cookie: key=value; domain=.example.com; path=/`
这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie 

## iframe 和多窗口通信
iframe元素可以在当前网页之中，嵌入其他网页。每个iframe元素形成自己的窗口，即有自己的window对象。iframe窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM

比如，父窗口运行下面的命令，如果iframe窗口不是同源，就会报错
```javascript
document
.getElementById("myIFrame")
.contentWindow
.document
//// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
```

这种情况不仅适用于iframe窗口，还适用于window.open方法打开的窗口，只要跨域，父窗口与子窗口之间就无法通信

如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的document.domain属性，就可以规避同源政策，拿到 DOM。

对于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题

- 片段识别符（fragment identifier）
- 跨文档通信API（Cross-document messaging）

### 片段识别符
片段标识符（fragment identifier）指的是，URL 的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新

父窗口可以把信息，写入子窗口的片段标识符
`var src = originURL + '#' + data; document.getElementById('myIFrame').src = src;`
父窗口把所要传递的信息，写入 iframe 窗口的片段标识符
子窗口通过监听hashchange事件得到通知
```javascript
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```
同样的，子窗口也可以改变父窗口的片段标识符
`parent.location.href = target + '#' + hash;`

### window.postMessage()
HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）

这个 API 为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源
举例来说，父窗口aaa.com向子窗口bbb.com发消息，调用postMessage方法就可以了
```javascript
// 父窗口打开一个子窗口
var popup = window.open('http://bbb.com', 'title');
// 父窗口向子窗口发消息
popup.postMessage('Hello World!', 'http://bbb.com');
```
postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为*，表示不限制域名，向所有窗口发送

子窗口向父窗口发送消息的写法类似
`window.opener.postMessage('Nice to see you', 'http://aaa.com');`

父窗口和子窗口都可以通过message事件，监听对方的消息
```javascript
// 父窗口和子窗口都可以用下面的代码，
// 监听 message 消息
window.addEventListener('message', function (e) {
  console.log(e.data);
},false);
```

message事件的参数是事件对象event，提供以下三个属性
- event.source：发送消息的窗口
- event.origin: 消息发向的网址
- event.data: 消息内容

### LocalStorage
通过window.postMessage，读写其他窗口的 LocalStorage 也成为了可能
主窗口写入 iframe 子窗口的localStorage
```javascript
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
// 存入对象
win.postMessage(
  JSON.stringify({key: 'storage', method: 'set', data: obj}),
  'http://bbb.com'
);
// 读取对象
win.postMessage(
  JSON.stringify({key: 'storage', method: "get"}),
  "*"
);
window.onmessage = function(e) {
  if (e.origin != 'http://aaa.com') return;
  console.log(JSON.parse(e.data).name);
};



window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case 'set':
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case 'get':
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, 'http://aaa.com');
      break;
    case 'remove':
      localStorage.removeItem(payload.key);
      break;
  }
};
```

## AJAX
同源政策规定，AJAX 请求只能发给同源的网址，否则就报错
除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制

- JSONP
- WebSocket
- CORS

### JSONP
JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务端改造非常小
它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来

首先，网页动态插入`<script>`元素，由它向跨源网址发出请求
```javascript
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```
上面代码通过动态添加`<script>`元素，向服务器example.com发出请求。注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于 JSONP 是必需的

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回
`foo({"ip": "8.8.8.8"});`
由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用JSON.parse的步骤

### WebSocket
WebSocket 是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信

```javascript
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```
有一个字段是Origin，表示该请求的请求源（origin），即发自哪个域名
正是因为有了Origin这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应
```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

### CORS
CORS 是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发GET请求，CORS 允许任何类型的请求


# History 对象
window.history属性指向 History 对象，它表示当前窗口的浏览历史

History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过3个网址
`window.history.length // 3`

由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航
`history.back() history.go(-1)`

History 对象主要有两个属性
- History.length：当前窗口访问过的网址数量（包括当前网页）
- History.state：History 堆栈最上层的状态值（详见下文）

## 方法

### History.back()、History.forward()、History.go()

这三个方法用于在历史之中移动。

- History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
- History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
- History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为0，相当于刷新当前页面。
history.go(0)相当于刷新当前页面。

```javascript
history.back();
history.forward();
history.go(-2);
history.go(0); // 刷新当前页面
```
移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页

### History.pushState()
History.pushState()方法用于在历史中添加一条记录

`window.history.pushState(state, title, url)`

该方法接受三个参数，依次为：

- state：一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填null。
- title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

假定当前网址是example.com/1.html，使用pushState()方法在浏览记录（History 对象）中添加一个新记录
```javascript
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
```
添加新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。这时，在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，页面的 URL 将显示2.html；你再点击一次倒退按钮，URL 将显示1.html
总之，pushState()方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应

使用该方法之后，就可以用History.state属性读出状态对象
```javascript
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
history.state // {foo: "bar"}
```

如果pushState()方法设置了一个跨域网址，则会报错

### History.replaceState()
History.replaceState()方法用来修改 History 对象的当前记录，其他都与pushState()方法一模一样

假定当前网页是example.com/example.html。

```javascript
history.pushState({page: 1}, 'title 1', '?page=1')
// URL 显示为 http://example.com/example.html?page=1

history.pushState({page: 2}, 'title 2', '?page=2');
// URL 显示为 http://example.com/example.html?page=2

history.replaceState({page: 3}, 'title 3', '?page=3');
// URL 显示为 http://example.com/example.html?page=3

history.back()
// URL 显示为 http://example.com/example.html?page=1

history.back()
// URL 显示为 http://example.com/example.html

history.go(2)
// URL 显示为 http://example.com/example.html?page=3
```

## popstate 事件
每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件

注意，仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发

```javascript
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};

// 或者
window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});
```
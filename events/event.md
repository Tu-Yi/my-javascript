# Event 对象

事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象
Event对象本身就是一个构造函数，可以用来生成新的实例
`event = new Event(type, options);`
Event构造函数接受两个参数。第一个参数type是字符串，表示事件的名称；第二个参数options是一个对象，表示事件对象的配置。该对象主要有下面两个属性。

- bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。
- cancelable：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault()取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为

```javascript
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);
```
注意，如果不是显式指定bubbles属性为true，生成的事件就只能在“捕获阶段”触发监听函数
```javascript
// HTML 代码为
// <div><p>Hello</p></div>
var div = document.querySelector('div');
var p = document.querySelector('p');

function callback(event) {
  var tag = event.currentTarget.tagName;
  console.log('Tag: ' + tag); // 没有任何输出
}

div.addEventListener('click', callback, false);

var click = new Event('click');
p.dispatchEvent(click);
```
上面代码中，p元素发出一个click事件，该事件默认不会冒泡。div.addEventListener方法指定在冒泡阶段监听，因此监听函数不会触发。如果写成div.addEventListener('click', callback, true)，那么在“捕获阶段”可以监听到这个事件

## 实例属性
### Event.bubbles，Event.eventPhase
Event.bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。前面说过，除非显式声明，Event构造函数生成的事件，默认是不冒泡的
Event.eventPhase属性返回一个整数常量，表示事件目前所处的阶段。该属性只读

Event.eventPhase的返回值有四种可能。

0，事件目前没有发生。
1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
2，事件到达目标节点，即Event.target属性指向的那个节点。
3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。

### Event.cancelable，Event.cancelBubble，event.defaultPrevented
Event.cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性
当Event.cancelable属性为true时，调用Event.preventDefault()就可以取消这个事件，阻止浏览器对该事件的默认行为

Event.cancelBubble属性是一个布尔值，如果设为true，相当于执行Event.stopPropagation()，可以阻止事件的传播
Event.defaultPrevented属性返回一个布尔值，表示该事件是否调用过Event.preventDefault方法。该属性只读

### Event.currentTarget，Event.target
Event.currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。
Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点。事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的，前者总是不变的，后者则是指向监听函数所在的那个节点对象
```javascript
// HTML代码为
// <p id="para">Hello <em>World</em></p>
function hide(e) {
  console.log(this === e.currentTarget);  // 总是 true
  console.log(this === e.target);  // 有可能不是 true
  e.target.style.visibility = 'hidden';
}

para.addEventListener('click', hide, false);
```

### Event.type
Event.type属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的
`var evt = new Event('foo');evt.type // "foo"`

### Event.timeStamp
Event.timeStamp属性返回一个毫秒时间戳，表示事件发生的时间它是相对于网页加载成功开始计算的
`var evt = new Event('foo'); evt.timeStamp // 3683.6999999995896`

### Event.isTrusted
Event.isTrusted属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的
`var evt = new Event('foo'); evt.isTrusted // false`

### Event.detail
Event.detail属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于click和dblclick事件，Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数

## 实例方法
### Event.preventDefault()
Event.preventDefault方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的cancelable属性为true，如果为false，调用该方法没有任何效果
注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用stopPropagation()或stopImmediatePropagation()方法
```javascript
// HTML 代码为
// <input type="checkbox" id="my-checkbox" />
var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);

// HTML 代码为
// <input type="text" id="my-input" />
var input = document.getElementById('my-input');
input.addEventListener('keypress', checkName, false);

function checkName(e) {
  if (e.charCode < 97 || e.charCode > 122) {
    e.preventDefault();
  }
}
```
上面代码中，浏览器的默认行为是单击会选中单选框，取消这个行为，就导致无法选中单选框

### Event.stopPropagation()
stopPropagation方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数
```javascript
function stopEvent(e) {
  e.stopPropagation();
}

el.addEventListener('click', stopEvent, false);
```

### Event.stopImmediatePropagation()
Event.stopImmediatePropagation方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比Event.stopPropagation()更彻底
如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了Event.stopImmediatePropagation方法，其他的监听函数就不会再执行了

### Event.composedPath()
Event.composedPath()返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点
```javascript
// HTML 代码如下
// <div>
//   <p>Hello</p>
// </div>
var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', function (e) {
  console.log(e.composedPath());
}, false);
// [p, div, body, html, document, Window]
```
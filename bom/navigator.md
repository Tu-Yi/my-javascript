# Navigator 对象，Screen 对象

## Navigator 对象的属性
### Navigator.userAgent
navigator.userAgent属性返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息
`navigator.userAgent 
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"`

通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串。这个字符串的格式并无统一规定，也无法保证未来的适用性，各种上网设备层出不穷，难以穷尽。所以，现在一般不再通过它识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能

不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串
```javascript
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
/mobi|android|touch|mini/i.test(ua)
```

### Navigator.plugins
Navigator.plugins属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等

### Navigator.platform
Navigator.platform属性返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等

### Navigator.onLine
navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）
用户变成在线会触发online事件，变成离线会触发offline事件，可以通过window.ononline和window.onoffline指定这两个事件的回调函数

`window.addEventListener('offline', function(e) { console.log('offline'); }); window.addEventListener('online', function(e) { console.log('online'); });`

### Navigator.language，Navigator.languages
Navigator.language属性返回一个字符串，表示浏览器的首选语言
Navigator.languages属性返回一个数组，表示用户可以接受的语言。Navigator.language总是这个数组的第一个成员。HTTP 请求头信息的Accept-Language字段，就来自这个数组
`navigator.languages  // ["en-US", "en", "zh-CN", "zh", "zh-TW"]`

### Navigator.geolocation
Navigator.geolocation属性返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错
Geolocation 对象提供下面三个方法。

- Geolocation.getCurrentPosition()：得到用户的当前位置
- Geolocation.watchPosition()：监听用户位置变化
- Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数

注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权

### Navigator.cookieEnabled
Navigator.cookieEnabled属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开

## Navigator 对象的方法
### Navigator.javaEnabled()
Navigator.javaEnabled()方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。

### Navigator.sendBeacon()
Navigator.sendBeacon()方法用于向服务器异步发送数据

## Screen 对象
Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。window.screen属性指向这个对象

- Screen.height：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
- Screen.width：浏览器窗口所在的屏幕的宽度（单位像素）。
- Screen.availHeight：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于height减去那些被系统组件的高度。
- Screen.availWidth：浏览器窗口可用的屏幕宽度（单位像素）。
- Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
- Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
- Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary。

`if (window.screen.width >= 1024 && window.screen.height >= 768) {// 分辨率不低于 1024x768}`


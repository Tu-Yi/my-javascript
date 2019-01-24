# Cookie
Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息

Cookie 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些。

- 对话（session）管理：保存登录、购物车等需要记录的信息。
- 个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪：记录和分析用户行为

有些开发者使用 Cookie 作为客户端储存。这样做虽然可行，但是并不推荐，因为 Cookie 的设计目标并不是这个，它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端储存应该使用 Web storage API 和 IndexedDB

Cookie 包含以下几方面的信息。

- Cookie 的名字
- Cookie 的值（真正的数据写在这里面）
- 到期时间
- 所属域名（默认是当前域名）
- 生效的路径（默认是当前网址）

举例来说，用户访问网址www.example.com，服务器在浏览器写入一个 Cookie。这个 Cookie 就会包含www.example.com这个域名，以及根路径/。这意味着，这个 Cookie 对该域名的根路径和它的所有子路径都有效。如果路径设为/forums，那么这个 Cookie 只有在访问www.example.com/forums及其子路径时才有效。以后，浏览器一旦访问这个路径，浏览器就会附上这段 Cookie 发送给服务器

浏览器可以设置不接受 Cookie，也可以设置不向服务器发送 Cookie。window.navigator.cookieEnabled属性返回一个布尔值，表示浏览器是否打开 Cookie 功能
document.cookie属性返回当前网页的 Cookie
`document.cookie`

不同浏览器对 Cookie 数量和大小的限制，是不一样的。一般来说，单个域名设置的 Cookie 不应超过30个，每个 Cookie 的大小不能超过4KB。超过限制以后，Cookie 将被忽略，不会被设置

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie。注意，这里不要求协议相同。也就是说，http://example.com设置的 Cookie，可以被https://example.com读取

## Cookie 与 HTTP 协议
### HTTP 回应：Cookie 的生成
服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个Set-Cookie字段 `Set-Cookie:foo=bar`

HTTP 回应可以包含多个Set-Cookie字段，即在浏览器生成多个 Cookie
除了 Cookie 的值，Set-Cookie字段还可以附加 Cookie 的属性
```javascript
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
```
一个Set-Cookie字段里面，可以同时包括多个属性，没有次序的要求
`Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly`

如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。举例来说，如果原始的 Cookie 是用如下的Set-Cookie设置的
`Set-Cookie: key1=value1; domain=example.com; path=/blog`

改变上面这个 Cookie 的值，就必须使用同样的Set-Cookie
`Set-Cookie: key1=value2; domain=example.com; path=/blog`
只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie
`Set-Cookie: key1=value2; domain=example.com; path=/`

上面的命令设置了一个全新的同名 Cookie，但是path属性不一样。下一次访问example.com/blog的时候，浏览器将向服务器发送两个同名的 Cookie
`Cookie: key1=value1; key1=value2`



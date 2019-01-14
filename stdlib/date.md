# Date 对象
Date对象是 JavaScript 原生的时间库。它以1970年1月1日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天（单位为毫秒）

## 普通函数
`Date() // "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"`
无论有没有参数，直接调用Date总是返回当前时间

## 构造函数
Date还可以当作构造函数使用。对它使用new命令，会返回一个Date对象的实例。如果不加参数，实例代表的就是当前时间
`var today = new Date()`
Date实例有一个独特的地方。其他对象求值的时候，都是默认调用.valueOf()方法，但是Date实例求值的时候，默认调用的是toString()方法。这导致对Date实例求值，返回的是一个字符串，代表该实例对应的时间
`var today = new Date();`
`today // "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"`

作为构造函数时，Date对象可以接受多种格式的参数，返回一个该参数对应的时间实例

```javascript
// 参数为时间零点开始计算的毫秒数
new Date(1378218728000)
// Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 参数为日期字符串
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)
```

参数可以是负整数，代表1970年元旦之前的时间
`new Date(-1378218728000) // Fri Apr 30 1926 17:27:52 GMT+0800 (CST)`

各个参数的取值范围如下。

- 年：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表19100年。如果是负数，表示公元前。
- 月：0表示一月，依次类推，11表示12月。
- 日：1到31。
- 小时：0到23。
- 分钟：0到59。
- 秒：0到59
- 毫秒：0到999。

注意，月份从0开始计算，但是，天数从1开始计算。另外，除了日期的默认值为1，小时、分钟、秒钟和毫秒的默认值都是0

这些参数如果超出了正常范围，会被自动折算。比如，如果月设为15，就折算为下一年的4月
日期设为0，就代表上个月的最后一天
`new Date(2013, 15)// Tue Apr 01 2014 00:00:00 GMT+0800 (CST)`
`new Date(2013, 0, 0) // Mon Dec 31 2012 00:00:00 GMT+0800 (CST)`

## 日期的运算
类型自动转换时，Date实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串
```javascript
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);

d2 - d1
// 2678400000
d2 + d1
// "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"
```

## 静态方法

**Date.now()**
Date.now方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数
`Date.now() // 1364026285194`

**Date.parse()**
Date.parse方法用来解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数,如果解析失败，返回NaN
`console.log(Date.parse('Aug 9, 1995')) //807897600000`

## 实例方法
**Date.prototype.valueOf()**
valueOf方法返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于getTime方法
`d.valueOf() // 1362790014817`

### to 类方法
**Date.prototype.toString()**
toString方法返回一个完整的日期字符串,因为toString是默认的调用方法，所以如果直接读取Date实例，就相当于调用这个方法
`var d = new Date(2013, 0, 1);` 
`d.toString() // "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"`
`d // "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"`
**Date.prototype.toUTCString()**
toUTCString方法返回对应的 UTC 时间，也就是比北京时间晚8个小时
**Date.prototype.toISOString()**
toISOString方法返回对应时间的 ISO8601 写法
**Date.prototype.toJSON()**
toJSON方法返回一个符合 JSON 格式的 ISO 日期字符串，与toISOString方法的返回结果完全相同
**Date.prototype.toDateString()**
toDateString方法返回日期字符串（不含小时、分和秒）
**Date.prototype.toTimeString()**
toTimeString方法返回时间字符串（不含年月日）
**本地时间**
- Date.prototype.toLocaleString()：完整的本地时间。
- Date.prototype.toLocaleDateString()：本地日期（不含小时、分和秒）。
- Date.prototype.toLocaleTimeString()：本地时间（不含年月日）。
```javascript
var d = new Date(2018,12)
console.log(d) // 2018-12-31T16:00:00.000Z
console.log(d.toString())  // Tue Jan 01 2019 00:00:00 GMT+0800 (GMT+08:00)
console.log(d.toISOString()) // 2018-12-31T16:00:00.000Z
console.log(d.toUTCString()) // Mon, 31 Dec 2018 16:00:00 GMT
console.log(d.toDateString()) // Tue Jan 01 2019
console.log(d.toTimeString()) // 00:00:00 GMT+0800 (GMT+08:00)
console.log(d.toLocaleString()) // 2019-1-1 00:00:00
console.log(d.toLocaleString('en-US')) // 1/1/2019, 12:00:00 AM
console.log(d.toLocaleString('zh-CN')) // 2019-1-1 00:00:00
console.log(d.toLocaleDateString()) // 2019-1-1
console.log(d.toLocaleTimeString()) // 00:00:00
```
 北京时间与格林尼治时间或UTC时间相差8个时区，北京、上海、重庆位于东8区，所以北京时间2013-1-1 0:00:00，转换为UTC时间为：Tue Jan 1 00:00:00 UTC+0800 2013，时间过了8小时

### get 类方法
Date对象提供了一系列get*方法，用来获取实例对象某个方面的值
- getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
- getDate()：返回实例对象对应每个月的几号（从1开始）。
- getDay()：返回星期几，星期日为0，星期一为1，以此类推。
- getFullYear()：返回四位的年份。
- getMonth()：返回月份（0表示1月，11表示12月）。
- getHours()：返回小时（0-23）。
- getMilliseconds()：返回毫秒（0-999）。
- getMinutes()：返回分钟（0-59）。
- getSeconds()：返回秒（0-59）。
- getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。

所有这些get*方法返回的都是整数，不同方法返回值的范围不一样。

- 分钟和秒：0 到 59
- 小时：0 到 23
- 星期：0（星期天）到 6（星期六）
- 日期：1 到 31
- 月份：0（一月）到 11（十二月）

Date对象还提供了这些方法对应的 UTC 版本，用来返回 UTC 时间
- getUTCDate()
- getUTCFullYear()
- getUTCMonth()
- getUTCDay()
- getUTCHours()
- getUTCMinutes()
- getUTCSeconds()
- getUTCMilliseconds()

`var d = new Date('January 6, 2013'); d.getDate() // 6 d.getUTCDate() // 5`

### set 类方法
Date对象提供了一系列set*方法，用来设置实例对象的各个方面
- setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
- setFullYear(year [, month, date])：设置四位年份。
- setHours(hour [, min, sec, ms])：设置小时（0-23）。
- setMilliseconds()：设置毫秒（0-999）。
- setMinutes(min [, sec, ms])：设置分钟（0-59）。
- setMonth(month [, date])：设置月份（0-11）。
- setSeconds(sec [, ms])：设置秒（0-59）。
- setTime(milliseconds)：设置毫秒时间戳。

这些方法基本是跟get*方法一一对应的，但是没有setDay方法，因为星期几是计算出来的，而不是设置的。另外，需要注意的是，凡是涉及到设置月份，都是从0开始算的，即0是1月，11是12月

set*方法的参数都会自动折算。以setDate为例，如果参数超过当月的最大天数，则向下一个月顺延，如果参数是负数，表示从上个月的最后一天开始减去的天数

set类方法和get类方法，可以结合使用，得到相对时间

set*系列方法除了setTime()，都有对应的 UTC 版本，即设置 UTC 时区的时间。

- setUTCDate()
- setUTCFullYear()
- setUTCHours()
- setUTCMilliseconds()
- setUTCMinutes()
- setUTCMonth()
- setUTCSeconds()

/* console.log(Date())
var today = new Date();
console.log(today) */

var d = new Date('2013-1-1 0:00:00')

d.setDate(2)



console.log(d) // 2018-12-31T16:00:00.000Z
console.log(d.toString())  // Tue Jan 01 2019 00:00:00 GMT+0800 (GMT+08:00)
console.log(d.toISOString()) // 2018-12-31T16:00:00.000Z
console.log(d.toUTCString()) // Mon, 31 Dec 2018 16:00:00 GMT
console.log(d.toDateString()) // Tue Jan 01 2019
console.log(d.toTimeString()) // 00:00:00 GMT+0800 (GMT+08:00)
console.log(d.toLocaleString()) // 2019-1-1 00:00:00
console.log(d.toLocaleString('en-US')) // 2019-1-1 00:00:00
console.log(d.toLocaleString('zh-CN')) // 2019-1-1 00:00:00
console.log(d.toLocaleDateString()) // 2019-1-1
console.log(d.toLocaleTimeString()) // 00:00:00


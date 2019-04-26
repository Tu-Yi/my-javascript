# Javascript内存图



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_11-03-01.png)



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_11-35-29.png)



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_11-49-08.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_11-49-108.png)

```javascript
var a = {name: 1}

var b =a

b = {name: 2}

a = null

//{name: 1}就是垃圾
```

**关闭页面，IE6必须回收所有对象，它不会自动回收，只有关闭浏览器才会回收**



![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_11-49-1108.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_12-07-42.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-04-26_12-07-57.png)


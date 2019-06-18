# leancloud

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-06-18_13-06-22.png)

```javascript
var APP_ID = 'qXl6W9vxbolyxcUCjs67LHQq-gzGzoHsz';
var APP_KEY = 'eOq0UluoW79IgUqEyAp1YIYe';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function (object) {
  alert('LeanCloud Rocks!');
})
```


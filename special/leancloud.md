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

```javascript
var query = new AV.Query('Message');
query.find()
  .then(
    function (messages) {
      console.log(messages)
      let array = messages.map(item => item.attributes)
      array.forEach(item => {
        let li = document.createElement('li')
        li.innerText = item.content
        messageList.append(li)
      });
    },
    function (error) {
      console.log(error)
    }
  );
```

```javascript
let myForm = document.querySelector('#postMessage')
myForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'content': content
  }).then(function (object) {
    window.location.reload();
  })
})
```


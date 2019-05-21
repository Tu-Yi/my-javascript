# jQuery

[api文档](<http://cndevdocs.com/>)

### 实现原理 简略版

jquery构造的对象前面加上 $

`var $node = $('ul>li')`

```javascript
window.jQuery = function(nodeOrSelector) {
  let nodes = {};
  if (typeof nodeOrSelector === 'string') {
    let temp = document.querySelectorAll(nodeOrSelector)
    for (let i = 0; i < temp.length; i++) {
      nodes[i] = temp[i]
    }
    nodes.length = temp.length
  } else if (nodeOrSelector instanceof Node) {
    nodes = {
      0: nodeOrSelector,
      length: 1
    }
  }

  nodes.addClass = function(...classes) {
    classes.forEach(value=>{
      for(let i=0;i<nodes.length;i++){
        nodes[i].classList.add(value)
      }
    })
  }
  nodes.getText = function(){
    var texts = []
    for(let i=0;i<nodes.length;i++){
      texts.push(nodes[i].textContent)
    }
    return texts;
  }
  nodes.setText = function(text){
    for(let i=0;i<nodes.length;i++){
      nodes[i].textContent = text
    }
  }
  nodes.text = function(text){
    console.log(this)
    if(text){
      this.setText(text)
    }else{
      return this.getText();
    }
  }

  return nodes;
}
window.$  = jQuery

var $div = $('div')
$div.addClass('red')
$div.setText('hi') 
```

**实现细节**

1. 构造函数实现：传入dom节点或选择器，返回伪数组对象，对象上可以进行节点的操作和获取

2. 判断传入的是节点还是选择器，构造伪数组对象

   ```javascript
   window.jQuery = function(nodeOrSelector) {
     let nodes = {};
     if (typeof nodeOrSelector === 'string') {
       let temp = document.querySelectorAll(nodeOrSelector)
       for (let i = 0; i < temp.length; i++) {
         nodes[i] = temp[i]
       }
       nodes.length = temp.length
     } else if (nodeOrSelector instanceof Node) {
       nodes = {
         0: nodeOrSelector,
         length: 1
       }
     }
   ｝
   ```

   

3. 实现addClass方法

   ```javascript
     nodes.addClass = function(...classes) {
       classes.forEach(value=>{
         for(let i=0;i<nodes.length;i++){
           nodes[i].classList.add(value)
         }
       })
     }
   ```

   

4. 实现获取设置文本

   ```javascript
   nodes.getText = function(){
       var texts = []
       for(let i=0;i<nodes.length;i++){
         texts.push(nodes[i].textContent)
       }
       return texts;
     }
     nodes.setText = function(text){
       for(let i=0;i<nodes.length;i++){
         nodes[i].textContent = text
       }
     }
     nodes.text = function(text){
       console.log(this)
       if(text){
         this.setText(text)
       }else{
         return this.getText();
       }
     }
   ```

   

5. 给函数设置一个别名

   ```javascript
   window.$  = jQuery
   ```

6. 返回对象，调用方法

   ```javascript
   var $div = $('div')
   $div.addClass('red')
   $div.setText('hi') 
   ```

   

   


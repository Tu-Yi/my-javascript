Node.prototype.getSiblings = function getSiblings(){
    var allChildren = this.parentNode.children;
    var array = [];
    for(let i=0;i<allChildren.length;i++){
        if(allChildren[i]!==this){
            array.push(allChildren[i])
        }
    }
    return array;
}



Node.prototype.addClass = function addClass(classes) { 
    for (const key in classes) {
        var method = classes[key] ? 'add' : 'remove';
        this.classList[method](key);
    }
}

item3.getSiblings.call(item3)
item3.addClass.call(item3,{'a':true,'b':false,'c':true})



window.jQuery = function(nodeOrSelector) {
    let node;
    if(typeof nodeOrSelector === 'string'){
      node = document.querySelector(nodeOrSelector)
    }else{
      node = nodeOrSelector
    }
    return {
      getSiblings: function() {
        var allChildren = node.parentNode.children;
        var array = [];
        for (let i = 0; i < allChildren.length; i++) {
          if (allChildren[i] !== node) {
            array.push(allChildren[i])
          }
        }
        return array;
      },
      addClass: function(classes) {
        for (const key in classes) {
          var method = classes[key] ? 'add' : 'remove';
          node.classList[method](key);
        }
      }
    }
  }
  
  
  var node2 = jQuery('#item3')
  console.log(node2.getSiblings())
  node2.addClass({
    'a': true,
    'b': false,
    'c': true
  })
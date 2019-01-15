/* var name = 'kangkang'
var f = function() {
    return this.name;
}
console.log(f())


var A = {
    name: '张三',
    describe: function () {
      return '姓名：'+ name;
    }
  };
  
  var name = '李四';
  var f = A.describe;
  console.log(f())  */

/*   var f = function () {
    console.log(this.x);
  }
  
  var x = 1;
  var obj = {
    f: f,
    x: 2,
  };
  
 
  
  // obj 环境执行
  console.log(obj.f()) // 2 */

 /*  function f() {
    console.log(this);
  }
  console.log(f()) */

 /*  var a = 2
  var o = {
    a: 1,
    f1: function () {
      console.log(this.a);
      var that = this
      var f2 = function () {
        console.log(that.a);
      }();
    }
  }
  
  console.log(o.f1())
  //1
  //1 */

/* var obj = {};

var f = function () {
return this;
};

console.log(f.call(obj) === obj) */

/* var obj = {}
console.log(Object.prototype.hasOwnProperty.call(obj,'toString()')) */


/* var counter = {
    count: 0,
    inc: function () {
      this.count++;
    }
  };
  
  var obj = {
    count: 100
  };
  var func = counter.inc.call(obj);
  func();
  console.log(obj.count) */
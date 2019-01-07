/* var obj = Object(1);
console.log(obj instanceof Object) // true
console.log(obj instanceof Number) // true

var obj = Object('foo');
console.log(obj instanceof Object) // true
console.log(obj instanceof String) // true

var obj = Object(true);
console.log(obj instanceof Object) // true
console.log(obj instanceof Boolean) // true
 */

 /* var obj = {}
 obj.toString = function(){
     return 'Hello'
 }
 console.log(obj + ' world!') */

 /* var type = function (o){
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
  };
  
  ['Null',
   'Undefined',
   'Object',
   'Array',
   'String',
   'Number',
   'Boolean',
   'Function',
   'RegExp'
  ].forEach(function (t) {
    type['is' + t] = function (o) {
      return type(o) === t.toLowerCase();
    };
  });
  
  console.log(type.isObject({})) // true
  console.log(type.isNumber(NaN)) // true
  console.log(type.isRegExp(/abc/)) // true */

/*   var obj = {
    p: 123
  };
  
 console.log(obj.hasOwnProperty('p'))  // true
 console.log(obj.hasOwnProperty('toString'))  // false */
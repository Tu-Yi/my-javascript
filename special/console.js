/* var number = 11 * 9;
var color = 'red';

console.log('%d %s balloons', number, color);
// 99 red balloons */

/* ['log', 'info', 'warn', 'error'].forEach(function(method) {
    console[method] = console[method].bind(
      console,
      new Date().toISOString()
    );
  });
  
  console.log("出错了！");
  // 2014-05-18T09:00.000Z 出错了！

 */
/* var languages = [
    { name: "JavaScript", fileExtension: ".js" },
    { name: "TypeScript", fileExtension: ".ts" },
    { name: "CoffeeScript", fileExtension: ".coffee" }
  ];
  
  console.table(languages); */

/*   function greet(user) {
    console.count(user);
    return 'hi ' + user;
  }
  
  greet('bob')
  //  : 1
  // "hi bob"
  
  greet('alice')
  //  : 2
  // "hi alice"
  
  greet('bob')
  //  : 3
  // "hi bob" */

/* var x = 0
if(x<1){
    console.assert(false,'范围错误')
}
console.log(x) */

/* console.time('Array initialize');

var array= new Array(10000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize'); */
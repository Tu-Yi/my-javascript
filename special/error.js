/* try{
    var err = new Error'出错')
}catch(e){
    Console.log(e.name)
}
 */


/* function UserError(message) {
    this.message = message || '默认信息';
    this.name = 'UserError';
}
  
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

console.log(new UserError('出错').message)

var x=0
if(x<1){
    //throw new Error('数值范围错误')
    //throw new UserError('出错').message
    throw 123
} */

/* var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp() */

/* function f() {
    try {
      console.log(0);
      throw 'bug';
    } catch(e) {
      console.log(1);
      return true; // 这句原本会延迟到 finally 代码块结束再执行
      console.log(2); // 不会运行
    } finally {
      console.log(3);
      return false; // 这句会覆盖掉前面那句 return
      console.log(4); // 不会运行
    }
  
    console.log(5); // 不会运行
  }
  
f(); */
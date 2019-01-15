/* console.log(JSON.stringify('123')) //"123"
console.log(JSON.stringify('false')) //"false"
console.log(JSON.stringify(false)) //false
console.log(JSON.stringify(123)) //123
console.log(JSON.stringify({name:123})) //{"name":123}
console.log(JSON.stringify({})) //{}
console.log(JSON.stringify([])) //[]
console.log(JSON.stringify({name:undefined,age:1})) //{"age":1}
console.log(JSON.stringify([undefined])) //[null]
console.log(JSON.stringify(/foo/)) //{}
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

console.log(JSON.stringify(obj)) //{"foo":1}
 */

var user = {
    name : function(){},
    firstName: '三',
    lastName: '张',
    get fullName(){
        return 1;
    },
    toJSON: function () {
        return {
          name: this.lastName + this.firstName
        };
    }
}
console.log(JSON.stringify(user))  //{"name":"张三"}
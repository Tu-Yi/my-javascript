/*
var o1 = {}
var o2 = o1
o2.a = 1
console.log(o1.a) //1
o1.b = 2
console.log(o2.b)//2
*/

/* 数字属性
var obj = {
    0.7: 'Hello World'
  };

console.log(obj['0.7']); 
console.log(obj[0.7]);
*/

/*数值键名不能使用点运算符
  var obj = {
    123: 'hello world'
  };
console.log(obj.123);
console.log(obj[123]);
*/

/*属性的查看
var obj = {
  key1: 1,
  key2: 2
};
console.log(Object.keys(obj));
*/

// 删除属性
// var obj={p : 123};
// console.log(Object.keys(obj));
// delete obj.p;
// console.log(Object.keys(obj));

// 判断属性存在
// var obj = {p : 123};
// console.log('p' in obj);
// console.log('toString' in obj);
// console.log('valueOf' in obj);
// console.log(obj.hasOwnProperty('toString'));

/* 遍历对象
var obj = { p : 123};
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        console.log(key,element);
    }
}
 */

/* //重复赋值
var a = 1
a = 2
console.log(a) //2
let b = 1
b = 2
console.log(b)// 2
const c = 1
c = 2
console.log(c) // Assignment to constant variable

//重复定义
var a1 = 1
var a1 = 2
console.log(a)
let b1 = 1
let b1 = 2
console.log(b1) //Identifier 'b1' has already been declared
const c1 = 1
const c1 = 2
console.log(c1)//Identifier 'c1' has already been declared

//块级作用域
if(1){
    var a2 = 1
    let b2 = 1
    const c2 = 1
}
console.log(a2)
console.log(b2) // b2 is not defined
console.log(c2) // c2 is not defined
 */


/*  let [n,{a,b},m] = [12,{a:1,b:2},12]
 console.log(a,n,m,b)
 let {a,b} = {1,2} //Unexpected token

 let [o,p];
 [o,p] = [1,2] //Missing initializer in destructuring declaration */


/* let add = (a,b)=>{
    return a+b;
}
console.log(add(2,3)) //5

let add1 = (a,b)=>a+b
console.log(add1(2,3)) //5

let add2 = a=>a+2
console.log(add2(2)) // 4 */


/* let add3 = (a=1,b=2,c=3)=>a+b+c
console.log(add3()) //6
console.log(add3(2,3)) //8 */


/* let add4 = (a,b,...args)=>{
    console.log(a,b,args)
}
add4(1,2,3,4,5,5,6,8)
// 1 2 [ 3, 4, 5, 5, 6, 8 ]

let add5 = (a,b,...args,c)=>{
    console.log(a,b,args,c)
} //Rest parameter must be last formal parameter
add4(1,2,3,4,5,5,6,8,111) */

/* let arr = [1,2,3]
let arr2 = [1,2,...arr,3]
console.log(arr2) //[ 1, 2, 1, 2, 3, 3 ]

function show1(...args){
    return show2(...args)
}
function show2(a,b){
    return [a,b]
}
console.log(show1(1,2)) */

/* let [{a,b}] = [{"a":1,"b":2}]
console.log(a,b) //1,2 */

/* let arr = [1,2,3,43,5464,46,12]
let arr2 = arr.map(item=>item>=60)
console.log(arr2) */

/* let arr = [1,2,3,43,5464,46,12]
let arr2 = arr.filter(item=>item%2)
console.log(arr2) //[ 1, 3, 43 ] */

/* let arr = [1,2,3,43,5464,46,12]
let sum=0
arr.forEach(item=>{
    sum+=item
})
console.log(sum) //5571 */

/* let arr = [1,2,3,43,5464,46,12]
let sum = arr.reduce((tmp,item,index)=>{
    return tmp+item
})
console.log(sum) //5571 */

/* let str = '123123'
Array.from(str).forEach(item=>console.log(item)) //123123
Array.prototype.slice.call(str).forEach(item=>console.log(item))
//123123 */

/* let a = 1
let b = 2
let json_1 = {a,b}
console.log(json_1) //{ a: 1, b: 2 }

let json_2 = {
    a : 1,
    b : 2,
    show(){
        console.log(a+b)
    }
}
json_2.show() //3 */

/* let obj = {
    name : 'yk',
    age : 12
}
let str = `我叫：${obj.name},年龄：${obj.age}`
console.log(str) //我叫：yk,年龄：12

let str2 = `<div>
    <p>hello</p>
</div>`
console.log(str2)
//<div><p>hello</p></div> */

/* class Animal{
    constructor(name){
        this.name = name;
    }
    jiao(){
        console.log("动物:"+this.name + "叫")
    }
}
class Cat extends Animal{
    constructor(name,age){
        super(name)
        this.age = age
    }
    jiao(){
        console.log("猫:"+this.name + "叫")
    }
    cry(){
        console.log("猫哭了" + this.age)
    }
}
let c = new Cat("kitty",12)
c.jiao();
c.cry();
//猫:kitty叫 猫哭了 */

/* let arr = [1,2,3,4]
arr.a = ()=>{
    console.log(this)
}
arr.b = function(){
    console.log(this)
}
arr.a() //{}
arr.b() //[ 1, 2, 3, 4, a: [Function], b: [Function] ] */

/* let obj={a : 1}
let obj2 = {a : 2}
obj.show = function(){
    return this.a;
}
console.log(obj.show())
console.log(obj.show.bind(obj2)()) */

/* var arr = 2
function a(){
    console.log(arr)
    console.log(brr);
    let arr = 1;
    var brr = 1;
}
a();// arr is not defined
 */


/*  function *show(){
     console.log(1);
     let n = yield 55;
     console.log(2+n);
     return 66;
 }
let gen = show();
let res1 = gen.next();
console.log(res1)
let res2 = gen.next(12);
console.log(res2) */



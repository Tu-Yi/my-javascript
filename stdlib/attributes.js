/* var obj = {p : 1}
console.log(Object.getOwnPropertyDescriptor(obj,'p')) */

/* var obj = Object.defineProperties({}, {
    p1: { value: 1, enumerable: true },
    p2: { value: 2, enumerable: false }
  });
  
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.keys(obj)) */

/* var obj = Object.defineProperty({}, 'p', {
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false
  });
  
console.log(obj.p) // 123
p = 234
console.log(obj.p) */

/* var obj = Object.defineProperties({}, {
    p1: { value: 123, enumerable: true },
    p2: { value: 'abc', enumerable: true },
    p3: { get: function () { return this.p1 + this.p2 },
      enumerable:true,
      configurable:true
    }
  });
  
  console.log(obj.p1) // 123
  console.log(obj.p2) // 123
  console.log(obj.p3) // 123
   */

/*   var obj = {};
  obj.p = 123;
  console.log(Object.getOwnPropertyDescriptor(obj, 'p').value)
  // 123
  Object.defineProperty(obj, 'p', { value: 246 });
  console.log(obj.p) // 246 */

/*   var obj = Object.defineProperties({},{
      p1:{value:1,writable:false,configurable:true,enumerable:false},
      p2:{value:1,writable:true,configurable:true,enumerable:true}
  })
  obj.p1 = 3
  obj.p2 = 3
console.log(obj.p1,obj.p2)

for(var key in obj){
    console.log(key)
}
console.log(Object.keys(obj))
console.log(JSON.stringify(obj)) */

/* var obj={
    n : 5,
    get p(){
        return this.n
    },
    set p(value){
        this.n = value
    }
}

console.log(obj.p)
obj.p = 10
console.log(obj.p) */
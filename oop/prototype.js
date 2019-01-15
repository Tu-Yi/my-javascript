/* function P() {}
var p = new P();

console.log(p.constructor === P) // true
console.log(p.constructor === P.prototype.constructor) // true
console.log(p.hasOwnProperty('constructor')) // false */

/* function Person(name) {
    this.name = name;
  }
  
  Person.prototype.constructor === Person // true
  
//   Person.prototype = {
//     method: function () {}
//   };
  Person.prototype.method = function () {}
  
  console.log(Person.prototype.constructor === Person) // true
  console.log(Person.prototype.constructor === Object) // false */
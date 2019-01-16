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

/*   function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
  };

  function Rectangle(){
    Shape.call(this)
  }
  Rectangle.prototype = Object.create(Shape.prototype)
  Rectangle.prototype.constructor = Rectangle

  var rec = new Rectangle()
  rec.move(1,2) */

/*   function M1() {
    this.hello = 'hello';
  }
  
  function M2() {
    this.world = 'world';
  }
  
  function S() {
    M1.call(this);
    M2.call(this);
  }
  
  // 继承 M1
  S.prototype = Object.create(M1.prototype);
  // 继承链上加入 M2
  Object.assign(S.prototype, M2.prototype);
  
  // 指定构造函数
  S.prototype.constructor = S;
  
  var s = new S();
  console.log(s.hello) // 'hello'
  console.log(s.world) // 'world' */
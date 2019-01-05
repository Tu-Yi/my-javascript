/* typeof
console.log(typeof 123);//number
console.log(typeof '123');//string
console.log(typeof false);//boolean
console.log(typeof {});//object
console.log(typeof []);//object
console.log(typeof [1,2,3]); //object
console.log(typeof function(){});//function
console.log(typeof null);//object
console.log(typeof undefined);//undefined
*/

/* 未定义和未赋值
var arr;
console.log(arr===undefined);
console.log(typeof v === "undefined");
*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
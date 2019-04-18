# 字符串

[demo](string.js)

## 概述

- 单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号

  `'key = "value"'` `"It's a long journey"`  

- 单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义

  `'Did she say \'Hello\'?'` `"Did she say \"Hello\"?"`  

- 字符串代码分行

  ```javascript
  var longString = 'Long \
  long \
  long \
  string';

  var longString = `Long 
  long 
  long 
  string`;
  ```

- 字符串可以被视为字符数组，因此可以使用数组的方括号运算符，但仅此而已

  ```javascript
  var s = 'hello';
  s[0] // "h"
  s[1] // "e"
  s[4] // "o"
  delete s[0];
  s // "hello"
  var s = 'hello';
  s.length // 5

  s.length = 3;
  s.length // 5
  ```
- 字符串遍历
  ```javascript
    var aaa = '1321321'
    Array.prototype.forEach.call(aaa,element => {
      console.log(element)
    })  
    Array.from(aaa).forEach(item=>{
      console.log(item)
    })
  ```

## 转义

- \0 ：null（\u0000）
- \b ：后退键（\u0008）
- \f ：换页符（\u000C）
- \n ：换行符（\u000A）
- \r ：回车键（\u000D）
- \t ：制表符（\u0009）
- \v ：垂直制表符（\u000B）
- \' ：单引号（\u0027）
- \" ：双引号（\u0022）
- \\ ：反斜杠（\u005C）




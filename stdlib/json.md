# JSON 对象

- 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

- 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。

- 字符串必须使用双引号表示，不能使用单引号。

- 对象的键名必须放在双引号里面。

- 数组或对象最后一个成员的后面，不能加逗号。

```javascript
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF] // 不能使用十六进制值

{ "name": "张三", "age": undefined } // 不能使用 undefined

{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象
```
null、空数组和空对象都是合法的 JSON 值

## JSON 对象
JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：JSON.stringify()和JSON.parse()

## JSON.stringify()
JSON.stringify方法用于将一个值转为 JSON 字符串

```javascript
console.log(JSON.stringify('123')) //"123"
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
```
如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤
如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null
正则对象会被转成空对象
JSON.stringify方法会忽略对象的不可遍历的属性.

**第二个参数**
JSON.stringify方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性
这个类似白名单的数组，只对对象的属性有效，对数组无效
```javascript
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

第二个参数还可以是一个函数，用来更改JSON.stringify的返回值

```javascript
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

**第三个参数**
JSON.stringify还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面
```javascript
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/

JSON.stringify({ p1:1, p2:2 }, null, '|-');
/*
"{
|-"p1": 1,
|-"p2": 2
}"
*/
```

**toJSON 方法**
如果参数对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他属性

```javascript
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

//toJSON方法的一个应用是，将正则对象自动转为字符串
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```

## JSON.parse()
JSON.parse方法用于将 JSON 字符串转换成对应的值
```javascript
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三

//如果传入的字符串不是有效的 JSON 格式，JSON.parse方法将报错
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL

//JSON.parse方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify方法类似
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```


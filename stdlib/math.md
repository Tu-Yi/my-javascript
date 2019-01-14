# Math 对象

## 静态属性
Math对象的静态属性，提供以下一些数学常数

- Math.E：常数e。
- Math.LN2：2 的自然对数。
- Math.LN10：10 的自然对数。
- Math.LOG2E：以 2 为底的e的对数。
- Math.LOG10E：以 10 为底的e的对数。
- Math.PI：常数π。
- Math.SQRT1_2：0.5 的平方根。
- Math.SQRT2：2 的平方根。

这些属性都是只读的，不能修改

## 静态方法
Math对象提供以下一些静态方法。

- Math.abs()：绝对值 `Math.abs(-1) // 1`

- Math.ceil()：向上取整  Math.floor()：向下取整
    Math.floor方法返回小于参数值的最大整数
    `Math.floor(3.2) // 3 Math.floor(-3.2) // -4` 
    Math.ceil方法返回大于参数值的最小整数
    `Math.ceil(3.2) // 4 Math.ceil(-3.2) // -3`
    这两个方法可以结合起来，实现一个总是返回数值的整数部分的函数
    ```javascript
    function ToInteger(x) {
    x = Number(x);
        return x < 0 ? Math.ceil(x) : Math.floor(x);
    }

    ToInteger(3.2) // 3
    ```

- Math.max()：最大值  Math.min()：最小值 
    Math.max方法返回参数之中最大的那个值，Math.min返回最小的那个值。如果参数为空,Math.min返回Infinity, Math.max返回-Infinity
    ```javascript
    Math.max(2, -1, 5) // 5
    Math.min(2, -1, 5) // -1
    Math.min() // Infinity
    Math.max() // -Infinity
    ```

- Math.pow()：指数运算
    Math.pow方法返回以第一个参数为底数、第二个参数为幂的指数值
    `Math.pow(2, 2) // 4`
    圆的面积
    ```javascript
    var radius = 20;
    var area = Math.PI * Math.pow(radius, 2);
    console.log(area)
    ```
- Math.sqrt()：平方根
    Math.sqrt方法返回参数值的平方根。如果参数是一个负值，则返回NaN
    `Math.sqrt(4) // 2 Math.sqrt(-4) // NaN`
- Math.log()：自然对数
- Math.exp()：e的指数
- Math.round()：四舍五入
    Math.round方法用于四舍五入
    ```javascript
    Math.round(0.1) // 0
    Math.round(0.5) // 1
    //注意，它对负数的处理（主要是对0.5的处理）
    Math.round(-1.1) // -1
    Math.round(-1.5) // -1
    Math.round(-1.6) // -2
    ```
- Math.random()：随机数
    Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1
    `Math.random() // 0.7151307314634323`
    任意范围的随机数生成函数如下
    ```javascript
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomArbitrary(1.5, 6.5)
    // 2.4942810038223864

    //任意范围的随机整数生成函数如下
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomInt(1, 6) // 5
    ```
    随机字符
    ```javascript
    function random_str(length) {
        var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
        ALPHABET += '0123456789-_';
        var str = '';
        for (var i = 0; i < length; ++i) {
            var rand = Math.floor(Math.random() * ALPHABET.length);
            str += ALPHABET.substring(rand, rand + 1);
        }
        return str;
        }

        random_str(6) // "NdQKOr"
    ```
- 三角函数方法
    Math.sin()：返回参数的正弦（参数为弧度值）
    Math.cos()：返回参数的余弦（参数为弧度值）
    Math.tan()：返回参数的正切（参数为弧度值）
    Math.asin()：返回参数的反正弦（返回值为弧度值）
    Math.acos()：返回参数的反余弦（返回值为弧度值）
    Math.atan()：返回参数的反正切（返回值为弧度值）
# 模块化

[js模块化](https://zhuanlan.zhihu.com/p/55407719)

```javascript
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};

import {firstName} from './profile.js';
console.log(firstName)
```
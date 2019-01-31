# ES6编译

解决浏览器兼容

[babel](http://babeljs.io)

npm包管理：自动下载，更新

1. 初始化工程
`cnpm init`
`cnpm install babel-cli -D`
package.json中加入执行命令
`"build": "babel src -d dist"`


2. 创建目录
创建src目录，放入es6文件和html文件

3. 预处理
新建.babelrc，键入
`{"presets": ["env"]}`
`cnpm install babel-preset-env -D`

4. 执行
`npm run build`
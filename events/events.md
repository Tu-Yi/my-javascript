# Events

### `addEventListener`

```javascript
//不会覆盖，是一个队列 on会后面覆盖前面的
function f1(){
    console.log(1)
}
function f2(){
    console.log(2)
}
images.addEventListener('click',f1)
images.addEventListener('click',f2)
images.removeEventListener('click',f1)
//1
```

**尽量使用`addEventListener`，而不是`on`**

### 事件模型

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div{
            border: 1px solid;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div id="grand1">
        爷爷
        <div id="parent1">
            爸爸
            <div id="child1">
                儿子
            </div>
        </div>
    </div>
    <script>
        grand1.addEventListener('click',()=>{
            console.log("爷爷")
        },true)
        parent1.addEventListener('click',()=>{
            console.log("爸爸")
        })
        child1.addEventListener('click',()=>{
            console.log("儿子")
        })
        //爷爷 儿子 爸爸
        //默认从内到外执行 儿子 爸爸 爷爷  冒泡
        //addEventListener第3个参数可以传true,就先执行外面的 爷爷 爸爸 儿子  捕获
        //先捕获再冒泡
        //如果自身既有冒泡也有捕获，按代码顺序
    </script>
</body>
</html>
```


/*  声明变量而没有赋值，则该变量为`undefined`
var arr;
console.log(arr);
*/

/* 没有声明就直接使用变量，javascript会报引用错误
console.log(x);
*/

/* 变量提升
console.log(a);
var a=1;
*/

/* 不要混淆赋值表达式（=）和相等运算符（==） 
var x = 1;
var y = 2;
if(x=y){
    console.log(x);
}
*/

/* switch严格相等
var a = 1;
switch(a){
    case true:
        console.log(1);
        break;
    default:
        console.log(0);
}
*/

/* 三元运算符
var myVar;
var arr = myVar ? '1':'0';
console.log(arr);
*/

/* while
var i=0;
while(i<100){
    console.log(i);
    i++;
}

while (true) {
    console.log('Hello, world');
}
*/

/* for
for(var i=0;i<100;i++){
    console.log(i);
}
*/

/* do while
var i=0;
do{
    console.log(i);
    i++;
}while(i<0)
*/

/* break
for(var i=0;i<10;i++){
    console.log(i);
    if(i===5)
        break;
}
*/

/* continue
for(var i=0;i<10;i++){
    if(i===5)
        continue;
    console.log(i);
}
*/

/* label break
top:
for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
        if(i===1 && j===1)
            break top;
        console.log(i,j);
    }
}
*/

/* label continue
top:
for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
        if(i===1 && j===1)
            continue top;
        console.log(i,j);
    }
}
*/

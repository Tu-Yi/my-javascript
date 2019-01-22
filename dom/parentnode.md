# ParentNode 接口，ChildNode 接口

节点对象除了继承 Node 接口以外，还会继承其他接口。ParentNode接口表示当前节点是一个父节点，提供一些处理子节点的方法。ChildNode接口表示当前节点是一个子节点，提供一些相关方法

## ParentNode 接口
如果当前节点是父节点，就会继承ParentNode接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会继承ParentNode接口

ParentNode.children
children属性返回一个HTMLCollection实例，成员是当前节点的所有元素子节点。该属性只读
ParentNode.firstElementChild
firstElementChild属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回null
ParentNode.lastElementChild
ParentNode.childElementCount
childElementCount属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0
ParentNode.append()，ParentNode.prepend()
append方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
该方法不仅可以添加元素子节点，还可以添加文本子节点

## ChildNode

ChildNode.remove()
ChildNode.before()，ChildNode.after()
before方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
注意，该方法不仅可以插入元素节点，还可以插入文本节点
ChildNode.replaceWith()
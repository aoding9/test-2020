// 兼容性问题解决方案，封装兼容函数
// 解析：传一个元素进来赋值给el，通过while循环，将el的下一个子节点赋值给el，判断el的节点类型是否为元素节点，是就返回这个元素节点，同时每次循环的条件是，判断el是否为null，为null则说明所有子节点已经全部遍历，没找到，返回null
function getNextElementSibling(element) {
    var el = element;
    while (el = el.nextSibling) {
        if (el.nodeType === 1) {
            return el;
        }
    }
    return null;
}
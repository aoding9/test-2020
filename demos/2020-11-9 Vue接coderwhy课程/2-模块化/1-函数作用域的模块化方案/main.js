// https://www.cnblogs.com/wswq/p/6282920.html

var moduleA = (function () {
  // 1.局部变量和函数
  var name = '雷军'
  function sing() {
    console.log(name + '唱了are you ok')
  }
  // 2.定义一个对象，将上面的变量和函数引用到obj上面
  var obj = {
    name: name,
    sing: sing
  }
  // 3.然后返回obj，并且在外面赋值给moduleA
  return obj
})()
// 原本外部无法访问内部的name和sing，但是通过moduleA对象，就可以访问了
// 原本name和sing在立即执行函数结束后就会被内存回收机制销毁，但是由于moduleA对其引用，所以保留了下来

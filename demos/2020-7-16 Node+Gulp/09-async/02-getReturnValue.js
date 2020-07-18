// 异步API不能通过函数返回值获取异步API的执行结果
function getMsg () {
  setTimeout(function() {
    return {
      msg: 'hello~'
    }
  },2000);
  // 如果不写return，函数默认返回undefined，如果return结果，return肯定是写在在异步处理函数外面，处于同步队列，异步处理结果还没出来就执行了return，所以也返回undefined
}

const msg = getMsg();
console.log(msg);



// 异步API如何获取执行结果？
function getData (callback) {
  setTimeout(function(){
    // 把回调函数写到异步任务里面，并且要在执行结果出来之后，他们处于同一个异步任务队列，所以可以得到处理结果
    let result = '我是执行结果';  // 假设代码到这一行异步处理完成，现在有了异步api的执行结果
    // 调用callback，并把执行结果传递给他，使其成为callback回调函数的实参
    callback(result);  
  },1000)
}

// 当别处调用异步API时，相当于在结果出来后，调用了回调函数，并且把结果传递进去，当然，我们要用一个形参来接收实参才行
getData(function(msg) {
  console.log('callback被调用了');
  console.log(msg);
})
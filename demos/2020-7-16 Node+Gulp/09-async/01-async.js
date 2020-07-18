// 同步API：当前任务未完成，会阻塞后续任务
// 异步API：不会阻塞其他任务
console.log('before');

setTimeout(function(){
  console.log('last');
},2000);
console.log('after');


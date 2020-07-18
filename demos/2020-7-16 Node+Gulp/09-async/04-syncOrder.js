// 同步api代码执行顺序
for (let i = 0; i < 1000; i++) {
  console.log(i);
}
console.log('代码执行结束==》同步api 代码被阻塞了');


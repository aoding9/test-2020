// 普通函数前面加async关键字就成为异步函数
// 异步函数默认返回值是promise实例对象

// async关键字相当于帮我们做了new Promise()
// async function fn () {
//   // throw关键字  代替reject方法，抛出异常信息 一旦throw就不再执行下面的代码
//   // throw '出错了奥';
     // return关键字代替了resolve方法，将返回结果封装在promise对象中
//   return 123;
// }
// fn().then((data) => {
//   console.log(data);
// }).catch((err)=> {
//   console.log(err);
// })

// await关键字 暂停异步函数向下执行，知道promise返回结果
// 只能在异步函数中使用
// 通过await，可以让异步任务像同步任务那样编程，并且，还可以用return来获取异步任务处理结果
// async function p1 () {
//   return 'p1';
// }
// async function p2 () {
//   return 'p2';
// }
// async function p3 () {
//   return 'p3';
// }

// ES6写法
// const fn = async () => {};
const p1 = async () => 'p1';
const p2 = async () => 'p2';
const p3 = async () => 'p3';

// 用一个函数来控制异步任务的执行顺序
async function run () {
  let r1 = await p1();
  let r2 = await p2();
  let r3 = await p3();
  console.log(r1,r2,r3);
}

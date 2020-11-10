const name = '雷军'
function sing() {
  console.log('are you ok')
}
// *1.第一种导出，导出变量，可以在导出的同时进行声明和赋值
export let age = 18
// *2.第二种导出，导出对象，在对象里面放要导出的内容
export { name, sing }
// *3，第三种导出，导出函数、类
export function dance() {
  console.log('在跳舞')
}
export class Person {
  constructor(uname, age) {
    this.uname = uname
    this.age = age
  }
}
// *4.export default默认导出，此时导入不需要使用对应的名称去解构赋值，而且可以由导入者自己命名
const city = '湖南'
export default city

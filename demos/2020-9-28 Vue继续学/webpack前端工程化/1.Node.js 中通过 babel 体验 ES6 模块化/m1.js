let a = 10
let b = 20
let c = 30

const show = () => {
  console.log('模块1')
}
// *一个模块只能暴露一次，多次导出会报错
// *如果没有导出任何内容，导入的是空对象
exports.default = {
  a,
  b,
  show,
}
// *按需导出和默认导出不冲突，是分开的
export let d = 10

// let a = 10
// let c = 20
// let d = 30

// function show() {
//   console.log('1111111111111')
// }

// export default {
//   a,
//   c,
//   show
// }

// export let s1 = 'aaa'
// export let s2 = 'ccc'
// export function say() {
//   console.log('ooooooooo')
// }

// export default {
//   d
// }

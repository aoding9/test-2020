console.log('ok')

import m1 from './m1.js'
console.log(m1)

import { d } from './m1'
console.log(d)

// *不导入成员，只执行一下模块里面的代码
import './m2'
// import m1, { s1, s2 as ss2, say } from './m1.js'

// console.log(m1)
// console.log(s1)
// console.log(ss2)
// console.log(say)

// import './m2.js'

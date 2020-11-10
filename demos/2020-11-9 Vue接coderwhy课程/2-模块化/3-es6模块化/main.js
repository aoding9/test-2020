// *用import 导入
import { name, sing } from './moduleA.js'
console.log(name, sing)

import { age, dance, Person } from './moduleA.js'
let ldh = new Person('刘德华', '18岁')
console.log(age, dance, Person, ldh)

// 默认导入，可以由导入者自己命名
import myCity from './moduleA.js'
console.log(myCity)

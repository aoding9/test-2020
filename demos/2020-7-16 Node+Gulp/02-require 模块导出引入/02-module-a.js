// 模块导出的另一种方式

const hello = name => `hello ${name}`;
module.exports.hello = hello;

// exports是module.exports的别名（地址引用关系），导出对象最终以module.exports为准
// 当exports与module.exports指向不同地址时，exports的地址不会生效
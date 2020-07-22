// 安装模板引擎
// npm i -g art-template

// 引入模板引擎模块
const template = require('art-template');

const path = require('path');
// require('art-template')返回值是一个方法
// 1: 模板路径，绝对路径
// 2：视图对象，包含data等属性
const Views = path.join(__dirname, 'views', '01.art');
const html = template(Views, {
  name: '张三',
  age: 20
});
console.log(html);
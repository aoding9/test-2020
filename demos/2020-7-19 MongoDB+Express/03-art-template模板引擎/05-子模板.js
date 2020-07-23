const template = require('art-template');
const path = require('path');

const Views = path.join(__dirname, 'views', '05.art');
const html = template(Views, {
  data: {
    msg: '我是首页'
  }
});
console.log(html);

// 标准语法
// 这里是关键字的形式
// {{include '模板'}}

// 原始语法
// 这里是include()方法的形式
// <% include('模板') %>


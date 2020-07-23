const template = require('art-template');
const path = require('path');

const Views = path.join(__dirname, 'views', '04.art');
const html = template(Views, {
  users: [{
    name: '张三',
    age: 9,
    sex: '男'
  },{
    name: '李四',
    age: 29,
    sex: '男'
  },{
    name: '小花',
    age: 19,
    sex: '女'
  }]
});
console.log(html);

// 标准语法
// {{each 数据}}...{{/each}}

// 原始语法
// <% for() { %> <% } %>

// {{each target}}
//   {{$index}} {{$value}} //$index是循环索引 $value是循环项
// {{/each}}

// <% for (var i = 0; i < target.length; i++) { %>
//   <%= i %> <%= target[i] %>
// <% } %>
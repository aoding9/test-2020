const template = require('art-template');
const path = require('path');

const Views = path.join(__dirname, 'views', '03.art');
const html = template(Views, {
  name: '张三',
  age: 19,
  // age: 18,
  // age: 17,
});
console.log(html);

// 标准语法
// {{if condition}}...{{/if}}
// {{if v1}}... {{else if v2}} ... {{/if}}

// 原始语法
// <% if (value) { %> ... <% } %>
// <% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>
// 相比{{}}，可以在<%%>中间写所有的原生js代码


// 改变age的值，将显示不同的内容
// <% %> <% %> 分别代表开始和结束

// 是不是感觉很乱？
// <% if (age > 18) { %> 年龄大于18 <% } %>

// 写成这样呢，看着就挺眼熟哈
// <% if (age > 18) { %>
//    年龄大于18
// <% } else if (age == 18) { %>
//   年龄等于18
// <% } else if (age < 18) { %>
//   年龄小于18
// <% } %>
const template = require('art-template');
const path = require('path');

const Views = path.join(__dirname, 'views', '02.art');
const html = template(Views, {
  name: '张三',
  age: 20,
  content: '<h1>我是标题</h1>'
});
console.log(html);
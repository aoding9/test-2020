const template = require('art-template');
const path = require('path');
const dateFormat = require('dateformat');

const Views = path.join(__dirname, 'views', '07.art');

// 导入模板变量
// template.defaults.imports.xxx = xxx  xxx是自定义的模板变量属性名和值
// 然后就可以在模板里使用模板变量里的方法了
template.defaults.imports.dateFormat = dateFormat;
const html = template(Views, {
    time: new Date()
});
console.log(html);

// 本模板引擎可以将模块引入art
// demo所使用到的模块：时间格式化模块npm install dateformat -g

const template = require('art-template');
const path = require('path');
const dateFormat = require('dateformat');

// 设置模板根目录
template.defaults.root = path.join(__dirname, 'views');
// 设置模板默认后缀名
template.defaults.extname = '.art';

// 导入模板变量
template.defaults.imports.dateFormat = dateFormat;

// 然后在使用模板时，不用自己拼接路径，第一个参数传模板名字就行了
const html = template('07', {
    time: new Date()
});
console.log(html);

// 这样用模板更简洁
console.log(template('08',{}));
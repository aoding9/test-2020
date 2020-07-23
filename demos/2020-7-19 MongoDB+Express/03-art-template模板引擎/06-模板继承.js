const template = require('art-template');
const path = require('path');

const Views = path.join(__dirname, 'views', '06.art');
const html = template(Views, {
  data: {
    msg: '我是首页'
  }
});
console.log(html);

// html骨架不能直接用子模板引入
// 通过模板继承，可以将html骨架抽离到单独的文件中，其他页面模板可以继承骨架文件

// 示例：
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8" />
//   <title>HTML骨架模板</title>
//   {{block 'head'}}{{/block}}
// </head>
// <body>
//   {{block 'content'}}{{/block}}
//   {{block 'footer'}}{{/block}}
// </body>
// </html>

//  index.art首页模板
//  继承骨架
//  {{extend './layout.art'}}
//  填充替换block
//  {{block 'head'}} <link rel="stylesheet" href="custom.css"> {{/block}} 
//  {{block 'content'}} <p>this is just an awesome page.</p> {{/block}} 


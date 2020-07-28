// 引入formidable模块 解析请求参数
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
  // 1.创建表单解析对象
  const form = new formidable.IncomingForm();
  // 2.配置上传文件的存放位置，需要项目里也新建这个目录，不然会报错
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  // 3.配置保留上传文件的后缀，默认是不保留
  form. keepExtensions = true;
  // 4.解析表单
  form.parse(req, async (err, fields, files) => {
    // err是错误对象
    // fields 对象类型 保存普通字段数据
    // files 对象类型 保存上传文件相关的数据

    // files.cover.path属性存储了文件在服务器硬盘的绝对路径，需要将硬盘路径分割，获取到public后面的部分
    // res.send(files.cover.path.split('public')[1]);
    // 解构赋值，省的下面重复写fields.
    const { title, author, publishDate, content } = fields;
    await Article.create({
      title,
      author,
      publishDate,
      cover: files.cover.path.split('public')[1],
      content
    })
  });
  // 添加完后重定向回文章列表页
  res.redirect('/admin/article');
}
const fs = require('fs');
// 引入formidable模块 解析请求参数
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
  const id = req.query.id;
  //  查询文章
  let article = await Article.findOne({_id: id}).catch((err) => console.log(err));;
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const { title, publishDate, content } = fields;
    // res.send(files);
    // 判断上传的是否为空文件
    let cover = '';
    if(files.cover.size < 7 ){
      cover = article.cover;
      try {
        if (await fs.existsSync(files.cover.path)) {
          await fs.unlinkSync(files.cover.path);
          console.log('文件删除成功');
        } else {
          console.log('文件不存在');
        }
      }catch(ex){
        console.log('文件删除出错', ex);
      }
    }else {
      cover = files.cover.path.split('public')[1];
    }
    await Article.updateOne({_id: id}, {
      title,
      publishDate,
      cover,
      content
    }).catch((err) => console.log(err));
  });
  // 添加完后重定向回文章列表页
  res.redirect('/admin/article');
}
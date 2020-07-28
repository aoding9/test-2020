// 1.引入mongoose
const mongoose = require('mongoose');
// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 20,
    minlength: 4,
    required: [true, '请填写文章标题']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '请填写作者']
  },
  publishDate: {
    type: Date,
    default: Date.now()
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
});
// 3.创建文章集合，接收集合构造函数
const Article = mongoose.model('Article', articleSchema);
// 将集合构造函数作为模块成员导出
module.exports = {
  Article
}

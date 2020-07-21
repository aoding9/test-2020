const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log('数据库连接成功'))
  .catch(err=>console.log(err, '数据库连接失败'));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String]
});
const User = mongoose.model('User', userSchema);

// 查询到一个并删除，匹配多个则删第一个，返回删除文档的内容
User.findOneAndDelete({
  name: '二哈'
})
  .then(doc => console.log(doc));

// 删除多个
User.deleteMany({
  // 如果不写查询条件，默认会删除所有，返回删除文档的数量
})
  .then(doc=>console.log(doc));
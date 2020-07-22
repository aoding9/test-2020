const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log('数据库连接成功'))
  .catch(err=>console.log(err, '数据库连接失败'));

  // 用户集合模型
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// 文章集合模型
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    // author字段存储文章集合的_id值，然后通过id进行关联
    type: mongoose.Schema.Types.ObjectId,
    // ref: '集合名'  关联某个集合
    ref: 'User' 
  }
});
// 编译模型
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// 创建用户
// User.create({
//   name: '小编'
// })
//   .then(doc => console.log(doc));

// 创建文章
// Post.create({
//   title: '标题',
//   author: '5f16a8dc0d2de21ae8dc821d'
// })
//   .then(doc => console.log(doc));

// 查询
// Post.find().then(doc => console.log(doc)).catch(err => console.log(err))
// populate()关联填充 将另一集合的数据引用并填充到本集合的目标位置
// populate()的详细说明 https://itbilu.com/nodejs/npm/HkAKMTECm.html
Post.find().populate('author').then(doc => console.log(doc)).catch(err => console.log(err))
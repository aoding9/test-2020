const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log('数据库连接成功'))
  .catch(err=>console.log(err, '数据库连接失败'));


  // 模型里面key的value可以有多个属性来设置值的规则
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true // 验证必须字段
    required: [true, '请输入文章标题'], //自定义错误信息
    minlength: [2, '标题长度不能小于2'], // 验证字符串最小最大长度
    maxlength: [5, '标题长度不能大于5'],
    trim: true // 去除字符串两边的空格
  },
  age: {
    type: Number,
    min: 18,
    max: 80
  },
  publishDate: {
    type: Date,
    // 设置默认值
    default: Date.now
  },
  category: {
    type: String,
    // 枚举   只能传数组中包含的字符串
    // enum: ['html', 'css' ,'js', 'nodejs'],
    // 枚举类型 自定义错误信息
    // 注意是values 复数形式
    enum: {
      values: ['html', 'css' ,'js', 'nodejs'],
      message: '没有这个分类'
    }
  },
  author: {
    type: String,
    // 自定义验证器
    validate: {
      validator: v => {
        // 返回布尔值
        // true验证成功  false验证失败
        // v 要验证的值
        return v && v.length > 4  // 传入v并且v长度大于4就返回true
      },
      message: '作者名不符合验证规则'
    }
    
  }
});

const Post = mongoose.model('Post', postSchema);

Post.create({
  // title: null,
  // title: '1',
  // title: '123456',
  title: '正确的标题',
  // age: 17,
  // age: 81,
  age: 40,
  category: 'java',
  // category: 'js',
  // author: null,
  author: '123',
  // author: '12345',

})
  .then(doc => console.log(doc))
  // 捕获错误信息
  .catch(err => {
    // 获取错误信息对象
    const errors = err.errors;
    // 遍历错误信息对象
    for( let item in errors) {
      // 为什么这里要用obj[][]来写而不是obj.xxx? https://blog.csdn.net/weixin_41796631/article/details/89339273
      // 因为[]可以用循环的方式，根据动态的变量来获取对象的属性，而.是静态的
      // console.log(errors.item.message);
      
      // 输出错误提示
      console.log(errors[item]['message']);
    }
  });  



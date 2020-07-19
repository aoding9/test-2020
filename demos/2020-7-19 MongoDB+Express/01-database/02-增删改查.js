const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log('数据库连接成功'))
  .catch(err=>console.log(err, '数据库连接失败'));


// 创建集合的步骤
// 1.设定集合规则
// 2.创建集合

// mongoose.Schema()参数是包含集合规则的对象，返回值是一个构造函数，使用这个构造函数将返回一个工厂函数，用工厂函数生成的实例都具有相同的规则
// 创建集合规则
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean
});
// 使用规则创建集合
// mongoose.model() 参数1：集合名字  参数2：集合规则  返回值：集合的构造函数，使用这个构造函数，将返回一个集合实例
const Course = mongoose.model('Course', courseSchema);  // 'Course'存到数据库里面集合名字就成了courses


// 创建文档
// 实际上就是指插入数据
// 1.创建集合构造函数的实例
// 2.用实例下的.save()来保存数据

const course = new Course({
  name: 'node.js基础',
  author: '佚名',
  isPublished: true
});
course.save();


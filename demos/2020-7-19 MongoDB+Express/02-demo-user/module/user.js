const mongoose = require("mongoose");
// 定义模型结构
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 18,
    max: 80,
  },
  password: String,
  email: String,
  hobbies: [String],
});

// 编译模型构造器
const User = mongoose.model("User", userSchema);

module.exports = User;
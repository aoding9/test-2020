const mongoose = require('mongoose');
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  age: {
    type: Number,
    min: 10,
    max: 25
  },
  sex: {
    type: String,
  },
  email: String,
  hobbies: [ String ],
  collage: String,
  enterDate: {
    type: Date,
    default: Date.now()
  }
})
const Student = mongoose.model('Student', studentsSchema);
// 导出集合的构造器
module.exports = Student;
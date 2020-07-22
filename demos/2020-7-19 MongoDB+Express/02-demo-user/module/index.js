const mongoose = require("mongoose");
// 数据库连接
mongoose
  .connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("数据库ok"))
  .catch(() => console.log("数据库连接失败"));

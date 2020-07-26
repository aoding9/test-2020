// 表单数组serializeArray转换json对象
function serializeToJson(form) {
  var result = {};
  // 获取到[{name: 'email', value: '输入的内容'}]
  var f = form.serializeArray();
  f.forEach(function (item) {
      // item.name就是表单的name，result[item.name]是动态设定对象的属性，也就相当于result.email，只不过是可以动态改变的
      result[item.name] = item.value;
  });
  return result;
}
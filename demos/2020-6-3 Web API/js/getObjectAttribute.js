// 功能：返回对象的属性数量
// 参数：对象obj
// 返回值：对象的属性数量
function getObjectAttributeNumber(obj) {
    //错误信息
    var err1 = 'Err1:obj是必须参数',
        err2 = 'Err2:obj不是对象';

    // id、trNum和tdNum参数必须写
    if (typeof obj == 'undefined') {
        console.log(err1);
        return
    }

    // obj必须是对象
    if (typeof obj != 'object') {
        console.log(err2)
        return
    }

    // 主体

    // 遍历对象属性,累加
    var count = 0;
    for (var k in obj) {
        count++
    }
    return count;
}
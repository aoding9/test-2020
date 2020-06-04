// 返回今天的年月日和星期
function getDate() {
    var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth(),
    d = date.getDate(),
    weekendArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekend = date.getDay();
    return y + '年 ' + m + '月' + d + '日 ' + weekendArr[weekend];
}
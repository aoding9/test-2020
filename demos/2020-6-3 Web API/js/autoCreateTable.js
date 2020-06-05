// 功能：自动生成表格
// 参数：table/tbody的id 行数trNum 列数tdNum 插入位置
// 使用：先手动创建<table>或<tbody>，给他id，然后传进来
function autoCreateTable(id, trNum, tdNum, indexRow) {
    //错误信息
    var err1 = 'Err1:id、trNum和tdNum参数必须写',
        err2 = 'Err1:id必须是字符串，其他参数必须是整数',
        err3 = 'Err3:id匹配的元素不存在',
        err4 = 'Err4:id匹配的元素必须是TABLE或TBODY',
        err5 = 'Err5:trNum和tdNum不能小于1，indexRow不能小于0';

    // id、trNum和tdNum参数必须写
    if (typeof id == 'undefined' || typeof trNum == 'undefined' || typeof tdNum == 'undefined') {
        console.log(err1);
        return
    }

    // 参数必须字符串
    if (typeof id != 'string' || typeof trNum != 'number' || trNum % 1 || typeof tdNum != 'number' || tdNum % 1 || (typeof indexRow != 'number' && indexRow % 1 && typeof indexRow != 'undefined')) {
        console.log(err2)
        return
    }

    // id匹配的元素必须存在
    var idEl = document.querySelector('#' + id);
    if (!idEl) {
        console.log(err3)
        return;
    }

    // id匹配的元素必须是TABLE或TBODY
    if (idEl.nodeName != 'TABLE' && idEl.nodeName != 'TBODY') {
        console.log(err4)
        return;
    }

    if (trNum < 1 || tdNum < 1 || indexRow < 0) {
        console.log(err5)
        return;
    }

    // 主体
    // 创建tr
    var tr = document.createElement('tr');
    // 创建td
    var tdsArray = [];
    for (var i = 0; i < tdNum; i++) {
        tdsArray.push('<td></td>')
    }
    var tds = tdsArray.join('');
    tr.innerHTML = tds;
    // 克隆并添加tr节点
    for (var i = 0; i < trNum; i++) {
        if (typeof indexRow != 'undefined') {
            idEl.insertBefore(tr.cloneNode(true), idEl.children[indexRow + i]);
        } else {
            idEl.appendChild(tr.cloneNode(true));
        }
    }
}
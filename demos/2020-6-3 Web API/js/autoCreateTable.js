// 功能：自动生成表格
// 参数：table/tbody元素对象 行数trNum 列数tdNum 插入第几行位置
// 使用：先手动创建并获取<table>或<tbody>，然后传进来
function autoCreateTable(element, trNum, tdNum, indexRow) {
    //错误信息
    var requiredErr1 = 'requiredErr1:缺少必须参数element',
        requiredErr2 = 'requiredErr2:缺少必须参数trNum',
        requiredErr3 = 'requiredErr3:缺少必须参数tdNum',
        typeErr1 = 'TypeErr1:element不是元素对象',
        typeErr2 = 'TypeErr2:trNum不是整数',
        typeErr3 = 'TypeErr3:tdNum不是整数',
        typeErr4 = 'TypeErr4:indexRow不是整数',
        conditionErr1 = 'conditionErr1:element不是TABLE或TBODY',
        conditionErr2 = 'conditionErr2:trNum不能小于1',
        conditionErr3 = 'conditionErr3:trNum不能小于1',
        conditionErr4 = 'conditionErr4:indexRow不能小于0';

    // 必须参数
    if (typeof element == 'undefined') {
        console.log(requiredErr1);
        return
    }
    if (typeof trNum == 'undefined') {
        console.log(requiredErr2);
        return
    }
    if (typeof tdNum == 'undefined') {
        console.log(requiredErr3);
        return
    }


    // 参数类型判断
    if (typeof element != 'object' || element.nodeType != 1) {
        console.log(typeErr1);
        return
    }
    if (typeof trNum != 'number' || trNum % 1) {
        console.log(typeErr2);
        return
    }
    if (typeof tdNum != 'number' || tdNum % 1) {
        console.log(typeErr3);
        return
    }
    if ((typeof indexRow != 'number' || indexRow % 1) && typeof indexRow != 'undefined') {
        console.log(typeErr4);
        return
    }



    // 参数限制条件判断
    if (element.nodeName != 'TABLE' && element.nodeName != 'TBODY') {
        console.log(conditionErr1)
        return;
    }

    if (trNum < 1) {
        console.log(conditionErr2)
        return;
    }
    if (tdNum < 1) {
        console.log(conditionErr3)
        return;
    }
    if (indexRow < 0) {
        console.log(conditionErr4)
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
            element.insertBefore(tr.cloneNode(true), element.children[indexRow + i]);
        } else {
            element.appendChild(tr.cloneNode(true));
        }
    }
}
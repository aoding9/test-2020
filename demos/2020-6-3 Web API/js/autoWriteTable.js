// 功能：自动填充表格
// 参数：table/tbody的id 对象数组objArr 写入位置indexRow, indexCol
// 使用：先手动创建<table>或<tbody>，给他id，再把数据保存成数组对象，然后传进来

function autoWriteTable(id, objArr, indexRow, indexCol) {

    //错误信息
    var err1 = 'Err1:id、objArr参数必须写',
        err2 = 'Err2:id必须是字符串，objArr必须是对象数组,后面两参数必须是整数',
        err3 = 'Err3:id匹配的元素不存在',
        err4 = 'Err4:id匹配的元素必须是TABLE或TBODY',
        err5 = 'Err5:indexRow和indexCol不能小于0',
        err6 = 'Err6:表格行数不够',
        err7 = 'Err7:表格列数不够',
        err8 = 'Err8:objArr中含有其他类型数组元素';


    // id、trNum和tdNum参数必须写
    if (typeof id == 'undefined' || typeof objArr == 'undefined') {
        console.log(err1);
        return
    }

    // id必须是字符串，objArr必须是对象数组,后面两参数必须是整数
    if (typeof id != 'string' || !(objArr instanceof Array) || (typeof indexRow != 'number' && indexRow % 1 && typeof indexRow != 'undefined') || (typeof indexCol != 'number' && indexCol % 1 && typeof indexCol != 'undefined')) {
        console.log(err2)
        return
    }

    for (var i = 0; i < objArr.length; i++) {
        if (typeof objArr[i] != 'object') {
            console.log(err8)
            return
        }
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

    if (indexRow < 0 || indexCol < 0) {
        console.log(err5)
        return;
    }

    // 获取所有tr
    var trs = idEl.querySelectorAll('tr');
    // 判断行数是否超出
    if (trs.length < objArr.length + indexRow) {
        console.log(err6)
        return;
    }

    // 主体
    // 遍历对象数组，对应tr
    indexRow = indexRow || 0;
    for (var i = indexRow; i < objArr.length + indexRow; i++) {
        // 遍历对象属性，对应td
        // 判断列数是否超出
        var colMax = 0;
        for (var k in objArr[i - indexRow]) {
            colMax++
        }
        if (trs[i].children.length -indexCol < colMax) {
            console.log(err7)
            return;
        }

        var j = indexCol || 0;
        for (var k in objArr[i - indexRow]) {
            trs[i].children[j].innerHTML = objArr[i - indexRow][k];
            j++
        }
    }


}
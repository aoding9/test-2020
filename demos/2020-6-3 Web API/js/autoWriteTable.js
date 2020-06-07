// 功能：自动填充表格
// 参数：table/tbody 对象数组objArr 写入位置indexRow, indexCol
// 使用：先手动创建并获取<table>或<tbody>，再把数据保存成数组对象，然后传进来

function autoWriteTable(element, objArr, indexRow, indexCol) {

    var requiredErr1 = 'requiredErr1:缺少必须参数element',
        requiredErr2 = 'requiredErr2:缺少必须参数objArr',
        typeErr1 = 'TypeErr1:element不是元素对象',
        typeErr21 = 'TypeErr21:objArr不是数组',
        typeErr22 = 'TypeErr22:objArr里含有不是对象的数组元素',
        typeErr3 = 'TypeErr3:indexRow不是整数',
        typeErr4 = 'TypeErr4:indexCol不是整数',
        conditionErr1 = 'conditionErr1:element不是TABLE或TBODY',
        conditionErr21 = 'conditionErr21:objArr数据溢出，表格行数不够',
        conditionErr22 = 'conditionErr22:objArr数据溢出，表格列数不够',
        conditionErr3 = 'conditionErr3:indexRow不能小于0',
        conditionErr4 = 'conditionErr4:indexCol不能小于0';

    // 必须参数
    if (typeof element == 'undefined') {
        console.log(requiredErr1);
        return
    }
    if (typeof objArr == 'undefined') {
        console.log(requiredErr2);
        return
    }

    // 参数类型判断
    if (typeof element != 'object' || element.nodeType != 1) {
        console.log(typeErr1);
        return
    }
    if (!(objArr instanceof Array)) {
        console.log(typeErr21);
        return
    }
    for (var i = 0; i < objArr.length; i++) {
        if (typeof objArr[i] != 'object') {
            console.log(typeErr22)
            return
        }
    }
    if ((typeof indexRow != 'number' || indexRow % 1) && typeof indexRow != 'undefined') {
        console.log(typeErr3);
        return
    }
    if ((typeof indexCol != 'number' || indexCol % 1) && typeof indexCol != 'undefined') {
        console.log(typeErr4);
        return
    }



    // 参数限制条件判断
    if (element.nodeName != 'TABLE' && element.nodeName != 'TBODY') {
        console.log(conditionErr1)
        return;
    }

    if (indexRow < 0) {
        console.log(conditionErr3)
        return;
    }
    if (indexCol < 0) {
        console.log(conditionErr4)
        return;
    }


    // 主体
    // 判断行数是否超出
    var trs = element.querySelectorAll('tr');
    indexRow = indexRow || 0;
    var maxRow = objArr.length + indexRow;
    if (trs.length < maxRow) {
        console.log(conditionErr21)
        return;
    }
    // 遍历对象数组，对应tr
    for (var i = indexRow; i < maxRow; i++) {
        // 遍历对象属性，对应td
        var thisRow = i - indexRow;
        // 判断列数是否超出
        var count = 0;
        for (var k in objArr[thisRow]) {
            count++
        }

        // 判断列数是否超出
        if (trs[i].children.length < count + indexCol) {
            console.log(conditionErr22)
            return;
        }

        var j = indexCol || 0;
        for (var k in objArr[thisRow]) {
            trs[i].children[j].innerHTML = objArr[thisRow][k];
            j++
        }
    }


}
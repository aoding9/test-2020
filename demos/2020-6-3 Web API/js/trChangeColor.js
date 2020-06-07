// 功能：鼠标经过改变tr颜色，移开恢复
// 参数1：tr的父级元素对象（爷爷辈也可，只要包含tr即可）
// 使用方法：获取包含tr的元素对象并传进来
// 会给鼠标所在的tr加一个trChangeColor类，默认改变颜色为#ccc，如果要自定义，需在css里给trChangeColor类指定样式
// 注意：自定义样式由于权重问题，需要加!important提高权重才能生效

function trChangeColor(element) {

    var requiredErr1 = 'requiredErr1:缺少必须参数element',
        typeErr1 = 'TypeErr1:element不是元素对象',
        conditionErr1 = 'conditionErr1:element里没有tr';

    // 必须参数
    if (typeof element == 'undefined') {
        console.log(requiredErr1);
        return
    }

    // 参数类型判断
    if (typeof element != 'object' || element.nodeType != 1) {
        console.log(typeErr1);
        return
    }


    // 参数限制条件判断
    // 元素里必须包含tr
    var trs = element.querySelectorAll('tr');
    if (!trs.length) {
        console.log(conditionErr1)
        return;
    }


    // 主体
    for (var i = 0; i < trs.length; i++) {
        trs[i].onmouseover = function () {
            this.style.backgroundColor = '#ccc'
            this.className = 'trChangeColor'
        }
        trs[i].onmouseout = function () {
            this.style.backgroundColor = ''
            this.className = ''
        }
    }
}
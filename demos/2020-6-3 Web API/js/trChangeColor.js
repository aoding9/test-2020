// 功能：鼠标经过改变tr颜色，移开恢复
// 参数1：tr的父级id（爷爷辈也可，只要包含tr即可）
// 参数2：类名，需要自己写一个改变tr颜色的css样式
// 使用方法：给包含tr的父级加id，然后传进来，默认#ccc色

function trChangeColor(id, className) {

    // 错误信息
    var err1 = 'Err1:id参数必须写',
        err2 = 'Err2:所有参数必须是字符串',
        err3 = 'Err3:与id匹配的元素不存在',
        err4 = 'Err4:与id匹配的元素必须包含tr';

    // id必须写
    if (typeof id == 'undefined') {
        console.log(err1);
        return
    }

    // 参数必须字符串
    if (typeof id != 'string' || (typeof className != 'string' && typeof className != 'undefined')) {
        console.log(err2)
        return
    }

    // id匹配的元素必须存在
    var idEl = document.querySelector('#' + id);
    if (!idEl) {
        console.log(err3)
        return;
    }

    // id匹配的元素必须包含tr
    var trs = idEl.querySelectorAll('tr');
    
    if (!trs.length) {
        console.log(err4)
        return;
    }

    // 主体
    for (var i = 0; i < trs.length; i++) {
        trs[i].onmouseover = function () {
            if (className) {
                this.className = className
            } else {
                this.style.backgroundColor = '#ccc'
            }
        }
        trs[i].onmouseout = function () {
            if (className) {
                this.className = ''
            } else {
                this.style.backgroundColor = ''
            }
        }
    }
}
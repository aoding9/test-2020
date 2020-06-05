// 功能：仿placeholder效果
// 传入输入框的id值，以及默认文字
// 让输入框失去焦点变灰色字，获得焦点变深色字
// 参数1：input的id 字符串
// 参数2：默认文字 字符串
// 参数3：失去焦点的颜色 字符串或空
// 参数4：获得焦点的颜色 字符串或空
// 使用方法：给input设个id，传进来即可

// 思路
// 首先判断参数是否合法
// 获得焦点 文字变深色
// 如果文字为默认值，就清空
// 失去焦点 文字变浅色
// 如果文字为空，就设为默认值

// 问题：
// 1：不能判断颜色字符串是否是真的颜色


function placeHolderText(id, defaultText, color1, color2) {
    //错误信息
    var err1 = 'Err1:id与defaultText参数必须写',
        err2 = 'Err1:所有参数必须是字符串',
        err3 = 'Err3:与id匹配的元素不存在',
        err4 = 'Err4:与id匹配的元素必须是INPUT';

    // id和defaultText必须写
    if (typeof id == 'undefined' || typeof defaultText == 'undefined') {
        console.log(err1);
        return
    }

    // 参数必须字符串
    if (typeof id != 'string' || typeof defaultText != 'string' || (typeof color1 != 'string' && typeof color1 != 'undefined') || (typeof color2 != 'string' && typeof color2 != 'undefined')) {
        console.log(err2)
        return
    }

    // id匹配的元素必须存在
    var idEl = document.querySelector('#' + id);
    if (!idEl) {
        console.log(err3)
        return;
    }

    // id匹配的元素必须是INPUT
    if (idEl.nodeName != 'INPUT') {
        console.log(err4)
        return;
    }
    // 主体
    // 颜色初始化
    color1 = color1 || '#999';
    color2 = color2 || '#333';
    idEl.style.color = color1;
    // 默认文字初始化
    idEl.value = defaultText
    // 获得焦点事件
    idEl.onfocus = function () {
        this.style.color = color2;
        if (this.value == defaultText) {
            this.value = ''
        }
    }
    // 失去焦点事件
    idEl.onblur = function () {
        this.style.color = color1;
        if (this.value === '') {
            this.value = defaultText
        }
    }
}
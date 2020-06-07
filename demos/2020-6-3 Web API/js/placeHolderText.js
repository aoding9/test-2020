// 功能：仿placeholder效果
// 传入输入框的id值，以及默认文字
// 让输入框失去焦点变灰色字，获得焦点变深色字
// 参数1：input元素对象
// 参数2：默认文字 字符串
// 参数3：失去焦点的颜色 字符串或空
// 参数4：获得焦点的颜色 字符串或空
// 使用方法：给input设个id，传进来即可

// 获得焦点 文字变深色 如果文字为默认值，就清空
// 失去焦点 文字变浅色 如果文字为空，就设为默认值

// 问题：
// 1：不能判断颜色字符串是否是真的颜色


function placeHolderText(element, text, color1, color2) {


    var requiredErr1 = 'requiredErr1:缺少必须参数element',
        requiredErr2 = 'requiredErr2:缺少必须参数text',
        typeErr1 = 'TypeErr1:element不是元素对象',
        typeErr2 = 'TypeErr2:text不是字符串',
        typeErr3 = 'TypeErr3:color1不是字符串',
        typeErr4 = 'TypeErr4:color2不是字符串',
        conditionErr1 = 'conditionErr1:element不是INPUT';

    // 必须参数
    if (typeof element == 'undefined') {
        console.log(requiredErr1);
        return
    }
    if (typeof text == 'undefined') {
        console.log(requiredErr2);
        return
    }


    // 参数类型判断
    if (typeof element != 'object' || element.nodeType != 1) {
        console.log(typeErr1);
        return
    }
    if (typeof text != 'string') {
        console.log(typeErr2);
        return
    }

    if (typeof color1 != 'string' && typeof color1 != 'undefined') {
        console.log(typeErr3);
        return
    }
    if (typeof color2 != 'string' && typeof color2 != 'undefined') {
        console.log(typeErr4);
        return
    }



    // 参数限制条件判断
    if (element.nodeName != 'INPUT') {
        console.log(conditionErr1)
        return;
    }

    // 主体
    // 颜色初始化
    color1 = color1 || '#999';
    color2 = color2 || '#333';
    element.style.color = color1;
    // 默认文字初始化
    element.value = text;
    // 获得焦点事件
    element.onfocus = function () {
        this.style.color = color2;
        if (this.value == text) {
            this.value = ''
        }
    }
    // 失去焦点事件
    element.onblur = function () {
        this.style.color = color1;
        if (this.value === '') {
            this.value = text
        }
    }
}
// 仿placeholder效果
// 传入输入框的id值，以及默认文字
// 让输入框失去焦点变灰色字，获得焦点变深色字
// 思路
// 获得焦点 文字变深色
// 如果文字为默认值，就清空
// 失去焦点 文字变浅色
// 如果文字为空，就设为默认值

function placeHolderText(inputId, defaultText) {
    var ipt = document.querySelector('#'+inputId);
    if (ipt.nodeName === 'INPUT' && typeof defaultText === 'string') {
        ipt.style.color = '#999';
        ipt.value = defaultText
        ipt.onfocus = function () {
            this.style.color = '#333';
            if (this.value === defaultText) {
                this.value = ''
            }
        }
        ipt.onblur = function () {
            this.style.color = '#999';
            if (this.value === '') {
                this.value = defaultText
            }
        }
    } else {
        console.log('传入元素的nodeName必须是INPUT，默认文字必须是是字符串')
    }
}
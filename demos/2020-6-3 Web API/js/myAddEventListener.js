// 事件监听兼容性函数
function myAddEventListener(element, eventName, fn) {
    if (element.addEventListener) {
        element.addEventListener(eventName, fn);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = fn;
    }
}
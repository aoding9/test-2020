// 删除事件兼容性解决方案
function myRemoveElementListener(element,eventName,fn){
    if (element.removeEventListener) {
        element.removeEventListener(eventName, fn)
    } else if (element.detachEvent) {
        element.detachEvent('on' + eventName, fn)
    } else {
        element['on' + eventName] = null
    }
}
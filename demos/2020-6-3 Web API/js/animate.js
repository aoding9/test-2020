function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback()
        }
        obj.step = (target - obj.offsetLeft) / 10;
        obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step);
        if (obj.step == -1) obj.step = -2; //为了解决浏览器窗口缩小后-1不移动的问题
        obj.style.left = obj.offsetLeft + obj.step + 'px';
    }, 20)
}
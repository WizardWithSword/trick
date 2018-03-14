(function () {
  var trick = function () {
    var ismobile = window && navigator && navigator.userAgent.toLowerCase().indexOf('mobile') !== -1
    var eventName = ismobile ? 'touchstart' : 'click' // 如果不是在移动端那么使用click事件模拟用户触摸行为
    var _clicktimes = 0 // 记录用户触发事件的次数。
    var _maxClickTimes = ismobile ? 6 : 2 // 恢复页面的次数阈值
    /**
     * 给元素节点添加样式
     * @param  {[type]} dom       [description]
     * @param  {[type]} classname [description]
     * @return {[type]}           [description]
     */
    var addclass = function (dom, classname) {
      if (!dom) {
        return false
      }
      var existClass = dom.getAttribute('class')
      existClass += ' ' + classname.trim()
      dom.setAttribute('class', existClass.trim())
      return dom
    }
    /**
     * 给元素节点去除样式
     * @param  {[type]} dom       [description]
     * @param  {[type]} classname [description]
     * @return {[type]}           [description]
     */
    var removeclass = function (dom, classname) {
      if (!dom) {
        return false
      }
      var existClass = dom.getAttribute('class')
      existClass = existClass.replace(classname.trim(), '').trim()
      dom.setAttribute('class', existClass)
      return dom
    }
    // 特效样式创建
    var css = document.createElement('style')
    css.innerText = `
      .flip{
        height: 100%;
        perspective: 1000;
        -webkit-perspective: 1000;
      }
      .flip body{
        height: 100%;
        transform-origin: bottom center;
        transform: rotateX(-90deg);
        animation: fall 1.5s ease-in;
      }
      .normal body{
        height: 100%;
        animation: up .5s ease-in;
      }
      @keyframes fall {
        0%   { transform: none; }
        100%   { transform: rotateX(-90deg); }
      }
      @keyframes up {
        0%   { transform: rotateX(-90deg); }
        100%   { transform: none; }
      }`
    var domHtml = document.querySelector('html')
    domHtml.appendChild(css)
    addclass(domHtml, 'flip') // 开始动画。
    var func = function () {
      // console.log('touch', _clicktimes)
      if (_clicktimes > _maxClickTimes) {
        _clicktimes = 0
        removeclass(domHtml, 'flip')
        addclass(domHtml, 'normal')
        domHtml.removeEventListener(eventName, func)
      } else {
        _clicktimes++
      }
    }
    domHtml.addEventListener(eventName, func)
    return true
  }
  var num = parseInt(Math.random() * 10)
  if ((num % 3) === 1) {
    // console.log('do it')
    var existload = window.onload
    var newload = function () {
      typeof existload === 'function' && existload()
      trick()
      return true
    }
    window.onload = newload
    // trick()
  } else {
    // console.log('normal')
  }
})()
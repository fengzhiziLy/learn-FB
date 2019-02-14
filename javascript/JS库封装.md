### 模仿jQuery

> $("div").css("color", "red")

**要封装的这个库应该是一个独立的单元--->模块化**

+ 独立：不依赖任何第三方库
+ 里面的东西大部分也是与世隔绝的，只有$，jQuery

```js
(function (glabal) {
  // global保存了window的引用
  function jQuery (selector) {
    // 1.获取页面中所有的元素
    // 2. 把这个元素放在特定的对象中

    const elements = document.getElementsByTagName(selector)
    // 随着$()操作频次的增加，会产生无数个相同的CSS方法，造成内存浪费
    // elements.css = () => {}
    var _init = jQuery.fn.init
    return new _init(selector)
    // return new jQuery.prototype.init(selector)
  }
  // init就是之前的F

  // 解决方案，把DOM操作的方法放在了原型中，这样看似可以正常访问，但是依然存在问题： --->
  // 破坏了原生的对象结构
  // HTMLCollection.prototype.css = () => {
  //   console.log('css方法')
  // }

  // jQuery.prototype.init = function (selector) {
  //   // 把DOM元素放到这个对象中
  //   // 下面的只能根据标签选择元素
  //   // const elements = document.getElementsByTagName(selector)
  //   const elements = document.querySelectorAll(selector)
  //   // jQuery内部封装了一个Sizzle引擎，封装了无数个正则表达式
  //   // 为了让这些元素可以在CSS方法中可以访问，所以需要把这些元素放在对象上面进行传递
  //   // this.elements = elements

  //   // jQuery为了后续的DOM操作的方便，将这些获取到的DOM元素全部放在了对象自己身上，让自己变成了就像数组一样，可以使用for循环进行遍历，这种对象特性称之为【伪数组】
  //   // 实现把这些所有DOM元素都添加到对象自己身上
  //   for (let i = 0; i < elements.length; i++) {
  //     // ele表示每一个DOM元素
  //     let ele = elements[i]
  //     this[i] = ele
  //   }
  //   this.length = elements.length
  // }
  // F.prototype.css = function(name, value) {
  //   for (let i = 0; i < this.length; i++) {
  //     let element = this[i]
  //     element.style[name] = value
  //   }
  // }
  // jQuery.prototype.init.prototype = {
  //   constructor: init,
  //   css(name, value) {
  //     for (let i = 0; i < this.length; i++) {
  //       let element = this[i]
  //       element.style[name] = value
  //     }
  //   }
  // }
  // 给jQuery添加了一个fn属性，fn属性等价于prototype属性
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function(selector) {
      const elements = document.querySelectorAll(selector)
      for (let i = 0; i < elements.length; i++) {
        // ele表示每一个DOM元素
        let ele = elements[i]
        this[i] = ele
      }
      this.length = elements.length
    },
    css(name, value) {
      for (let i = 0; i < this.length; i++) {
        let element = this[i]
        element.style[name] = value
      }
    }
  }
  // 此时创建的jQuery是init构造函数的实例
  // CSS方法在jquery.prototype对象中
  // 为了让jquery对象可以访问到css方法
  // 让init的原型继承自jQuery.prototype
  jQuery.fn.init.prototype = jQuery.fn
  // 1.创建了一个init对象
  // 2. 执行css方法
  // 找对象本身有没有css方法，并没有
  // 找对象的原型init.prototype --> jquery.prototype
  // 发现jquery.prototype中有css方法

  jQuery.extend = function (...args) {
    // 这里的extend方法参数并不确定，，所以不要指定形参
    // 通过函数内置对象arguments进行操作
    // 进行对象拷贝，需要将第二个参数及其后面的参数中的属性遍历添加到第一个参数
    const target = args[0]
    for (let i = 1; i < args.length; i++) {
      let arg = args[i]
      // 取出对象中的每一个属性
      for (let key in arg) {
        let value = arg[key]
        // 把该属性添加到第一个参数中
        target[key] = value
      }
    }
    return target
  }

  // 第二个extend方法 $.fn.extend
  // 这是编写jQuery插件的核心方法
  // 功能就是把这些方法添加到原型中
  jQuery.fn.extend = jQuery.extend = function (...args) {
    // 两个extend方法区别在于
    // 接受数据的对象不同： $.extend: 第一个参数  $.fn.extend: this
    // 提供数据的对象不同： $.extend: 第二个参数及其后面的 $.fn.extend: 所有参数
    let target, source = []
    source = [...args]
    // 判定两种情况
    if (this === jQuery) {
      // $.extend
      target = args[0]
      source.splice(0, 1)   // 删除第一个元素
    } else {
      target = this
    }
    source.forEach(function (item, index) {
      // item: 每一个数据源对象（提供数据的对象）
      // 取出对象中的每一个属性
      Object.keys(item).forEach(function (key) {
        target[key] = item[key]
      })
    })
    return target
  }

  global.$ = global.jQuery = jQuery;
})(window)
```
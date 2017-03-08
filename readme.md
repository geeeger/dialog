# dialog

一个原生对话框插件

## 介绍

本需求来自于组长觉得我们需要有一个通用对话框插件，所以就有了该插件。因为是随便写的，所以结构可能比较混乱。下面先介绍其拥有方法及实例化过程。

## 静态方法

### Dialog.set(key, value)

该方法的意义在于向内部配置\_config中存入新的设置。方便集中管理，另外Dialog.set不可以设置(覆盖)前缀为default的配置。

```js

```

### Dialog.get(key)

### Dialog.opened()

### Dialog.Button

这是个构造器

### Dialog.util.inArray(arr, who)
### Dialog.util.isArray(obj)
### Dialog.util.isObject(obj)
### Dialog.util.isFunction(obj)
### Dialog.util.isString(obj)
### Dialog.util.hasClass(el, cname)
### Dialog.util.trim(str)
### Dialog.util.addClass(el, cname)
### Dialog.util.removeClass(el, cname)
### Dialog.util.isDom(el)
### Dialog.util.toArray(arraylike)
### Dialog.util.extend(main, extend)
### Dialog.util.observable(ctx)
### Dialog.util.randomStr()
### Dialog.util.isArrayLike(obj)
### Dialog.util.hide(obj)
### Dialog.util.show(obj)
### Dialog.util.html(obj, html)
### Dialog.util.css(el, styles)
### Dialog.util.toCamels(str)
### Dialog.util.every(arr, fn)
### Dialog.util.addEvt(dom, eventname, fn)
### Dialog.util.removeEvt(dom, eventname, fn)
### Dialog.util.eventFix(event)


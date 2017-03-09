# dialog

一个原生对话框插件

## 介绍

本需求来自于组长觉得我们需要有一个通用对话框插件，所以就有了该插件。因为是随便写的，所以结构可能比较混乱,用起来可能会比较low。下面先介绍其拥有方法及实例化过程。

## 静态方法

### Dialog.set(key, value)

该方法的意义在于向内部配置\_config中存入新的设置。方便集中管理，另外Dialog.set不可以设置(覆盖)前缀为default的配置。

```js
// 对默认模板进行扩展，注意默认模板如下
// defaultTemplate: [
//        '<div class="qie-dialog-mask">',
//            '<div class="qie-dialog-dialog">',
//                '<div class="qie-dialog-header">',
//                    '<div class="qie-dialog-title"></div>',
//                    '<input class="qie-dialog-close" type="button" value="\xd7" />',
//                '</div>',
//                '<div class="qie-dialog-content"></div>',
//                '<div class="qie-dialog-footer">',
//                    '<div class="qie-dialog-buttons"></div>',
//                '</div>',
//            '</div>',
//        '</div>'
//    ].join(''),
//    
//  必须保证只在原结构上扩展，
//  并且不能向title,content里添加元素，该两处是通过innerHTML设置进内容的
Dialog.set('template', [
    '<div class="qie-dialog-mask">',
        '<div class="qie-dialog-dialog">',
            '<div class="qie-dialog-header">',
                '<div class="qie-dialog-title"></div>',
                '<input class="qie-dialog-close" type="button" value="\xd7" />',
            '</div>',
            '<div class="qie-dialog-content"></div>',
            '<div class="qie-dialog-footer">',
                '<div class="qie-dialog-buttons"></div>',
            '</div>',
        '</div>',
    '</div>'
.join(''));
```

### Dialog.get(key)

从_cache中获取配置。

### Dialog.opened()

检查 _cache中是否有正在显示的Dialog实例,返回true 或 false

### Dialog.Button(ctx, wrap, options)

这是个构造器,初始化一个按钮并方便管理。在本插件中，该构造器用于生成按钮。

--- ctx 指该实例依附的父实例
--- wrap指按钮完成初始化后添加进的那个dom元素
--- options是按钮参数


```js
// 一个按钮的用法

// html
//<div id="wrap"></div>


var buttons = {
    description: 'parent';
};

new Dialog.Button(buttons, document.querySelector('#wrap'), {
    value: 'button',
    text: '一个按钮',
    id: 'button',
    name: 'button',
    // 点击事件
    callback: function (evt) {
        console.log(this) // 返回button实例
        console.log(this.value()) //返回value值 'button'
        console.log(this.disable()) //返回按钮是否disable
        console.log(this.disable(true)) // 禁用按钮
        console.log(this.disable(false)) // 启用按钮

        // 注： display block display none; 若css设置过display其他值，小心
        this.show() // 显示元素
        this.hide() // 隐藏元素
        // 点击代理,可以通过该方法设置多个代理，若 return false; 将不会执行后续事件回调
        this.proxy(function () {
            console.log('我设置了一个代理，下次再次点击会出现这句话。')
        });

        console.log(this.parent.description); // print 'parent'
        console.log(this.wrap); //  <div id="wrap">...</div>
        console.log(this.dom); // <button value="button" id="button" name="button">一个按钮</button>
        this.free() // 释放内存 ps： 不会删除元素，需要手动删除
    },
    proxy: function () {
        console.log('有该配置的话会调用this.proxy包一层')
    }
});

```

Dialog中对应options.buttons 配置(数组对象)会调用该构造器产生按钮，并放置于 qie-dialog-buttons里,对应Dialog实例里的引用会放到数组 dialog.btnGroups里

this.btnGroups[0].hide();

## 通用静态方法

### Dialog.util.inArray(arr, who)

检查值在不在数组里

### Dialog.util.isArray(obj)

检查对象是不是数组

### Dialog.util.isObject(obj)

检查对象是不是对象

### Dialog.util.isFunction(obj)

检查对象是不是函数

### Dialog.util.isString(obj)

检查对象是不是字符串

### Dialog.util.hasClass(el, cname)

元素是否有某class名

### Dialog.util.trim(str)

去除字符串的空格

### Dialog.util.addClass(el, cname)

为元素增加class名

### Dialog.util.removeClass(el, cname)

删除元素class名

### Dialog.util.isDom(el)

检查对象是不是dom元素

### Dialog.util.toArray(arraylike)

将类数组转换为数组，若非类数组，将会直接包装成数组对象

### Dialog.util.extend(main, extend)

扩展器(无保护，会覆盖main上的内容);当只有一个参数的时候，向Dialog原型上添加内容,当有两个参数的时候，向main对象上添加内容. extend接受对象类型

### Dialog.util.observable(ctx)

事件系统，用该方法可以混入事件方法。并且会产生一个独立的回调池. ctx选填。Dialog实体化过程中混入了事件方法，可监听事件为'click, resize, close, closed'

```js
// mixin
var d = Dialog.util.observable();

d.on('click', function (value) {
    console.log(value) // 1
});

d.trigger('click', 1);

// d.off() 清空内部_callback池
// d.off('eventName') 清空_callback[eventName]
// d.off('eventName', fn) 清空_callback[eventName][i] (fn === _callback[eventName][i])
// 

var a = {
    b:1
};

Dialog.util.observable(a);

console.log(typeof a.on) // function

```


### Dialog.util.randomStr()

生成一个伪随机字符串,在Dialog中用于生成_id

### Dialog.util.isArrayLike(obj)

检查对象是否为类数组

### Dialog.util.hide(obj)

// dom.style.display = 'none';

### Dialog.util.show(obj)

// dom.style.display = 'block';

### Dialog.util.html(obj, html)

// dom.innerHTML(html)

### Dialog.util.css(el, styles)

// dom.style.cssText = stylesStr

注意cssText特性

### Dialog.util.toCamels(str)

//将aaa-bbb-xxx转换为aaaBbbXxx

### Dialog.util.every(arr, fn)

// 类似 Array.prototype.every

### Dialog.util.addEvt(dom, eventname, fn)

// 兼容ie 8 的 添加事件方法

### Dialog.util.removeEvt(dom, eventname, fn)

// 兼容ie 8 的删除事件方法

### Dialog.util.eventFix(event)

// 兼容ie 8 的event对象

## Dialog 构造器

### 参数的含义

```js
{
    init: function () {
        // 初始化前执行的方法
    },
    // 主题class名，直接设置在wrap上
    theme: 'string'，
    // 是否锁屏，若为true, qie-dialog-mask会全屏显示,遮盖住
    lock: true,
    // 可选，默认是1988
    zIndex: 1999,
    // 是否显示对话框头
    header: false,
    // 是否显示对话框脚
    footer: false,
    // 初始化完成时对话框是否可见
    visible: true,
    // 多少秒后关闭 (该处不会去关闭，但会触发close事件(同时会触发该配置上的close方法配置))
    time: 3000,
    // 初始化完成后出发的事件
    inited: function () {},
    // 当屏幕发生resize时
    resize: function () {},
    // time处解释了
    close: function () {},
    content: "内容",
    title: "标题",
    // 是否显示关闭按钮
    closebtn: false,
    // 配置按钮,上部分有解释
    buttons: [
        {
            value: 'ok',
            callback: function (evt) {
                this.lock = true;
                ajax.get('/', function (data) {
                    this.lock = false;
                    if (data.code === 200) {
                        this.parent.close();
                    }
                })
            },
            proxy: function (evt) {
                if (this.lock) {
                    return false;
                }
            },
            name: 'ok',
            id: "ok",
            text: '确认',
            className: 'qie-dialog-btn-ok'
        },
        {
            value: 'cancel',
            name: 'cancel',
            id: "cancel",
            text: '取消',
            callback: function (evt) {
                console.log(this);
            },
            className: 'qie-dialog-btn-cancel'
        }
    ],
    // 配置其他事件
    events: [
        {
            // 
            tag: 'tips',
            evt: 'mouseover',
            fn: function (evt) {
                console.log(this);
                var target = evt.target;
            }
        },
        {
            tag: 'tips',
            evt: 'mouseout',
            fn: function (evt) {
                console.log(this);
                var target = evt.target;
            }
        }
    ]
}
```

配置其他事件:若我们使用Dialog.set('template')扩展了模板结构比如

```js
Dialog.set('template', [
    '<div class="qie-dialog-mask">',
        '<div class="qie-dialog-dialog">',
            '<div class="qie-dialog-header">',
                '<div class="qie-dialog-title"></div>',
                '<input class="qie-dialog-close" type="button" value="\xd7" />',
            '</div>',
            '<div class="qie-dialog-content"></div>',
            '<div class="qie-dialog-tips"></div>'
            '<div class="qie-dialog-footer">',
                '<div class="qie-dialog-buttons"></div>',
            '</div>',
        '</div>',
    '</div>'
.join(''));
```

那么该tips会被映射到实例的dom对象上。this.dom.tips就是该dom对象。(实际上模板上className为qie-dialog-aaa-bbb)的dom都会被映射到this.dom上.变成this.dom.aaaBbb的驼峰形式

```js
events: [
        {
            // 
            tag: 'tips',
            evt: 'mouseover',
            fn: function (evt) {
                console.log(this);
                var target = evt.target;
            }
        },
        {
            tag: 'tips',
            evt: 'mouseout',
            fn: function (evt) {
                console.log(this);
                var target = evt.target;
            }
        }
    ]
```

这样我们就给tips增加了mouseover,mouseout方法.

## 实例方法以及属性

### this.resize()

调用该方法会重新居中

### this.show()

调用该方法会显示对话框 (visibility: visible) ， wrap会加上class status-open

### this.hide()

调用该方法会隐藏对话框 (visibility: hidden), wrap会加上class status-close

### this.visible(booleanVal)

不填参数时返回是否可见（boolean），填写true或false时调用this.show(),this.hide()

### this.distroy()

销毁,同时方法会被销毁，内存会被回收，并删除对话框

### this.close()

销毁的别名方法。

### this.lock()

调用该方法将展开mask层，并触发resize

### this.unlock()

调用该方法将收起mask层，并触发resize

### this.title(str)

调用该方法可以设置对话框标题，并触发resize

### this.button(arr)

调用该方法将向this.dom.buttons内追加多个按钮,

```js

var dialog = new Dialog({
    visible: false,
    close: function () {
        this.hide();
    },
    closebtn: true,
    content: '抱歉，您未通关'
});

var btn = document.querySelector('#btn');

var btn1 = document.querySelector('#btn1');

btn.onclick = function () {
    if (!dialog.pass) {
        dialog.pass = true;
        dialog.button([{
            value: 'pass',
            text: '通过',
            callback: function (evt) {
                alert('祝贺你!')
            },
            className: 'qie-dialog-btn-pass'
        }]);
        dialog.content('恭喜您，获得了通关手续。')
    }
};

bt1.onclick = function () {
    dialog.show();
};

```

### this.content(str)

设置内容,设置完成会触发resize

### this.time(number)

设置关闭时间, 超时number毫秒后，会触发close事件（在options.close里处理）


/**
 * Empty module
 */
(function() {
    'use strict';

    // var _cache = [];

    /*
     * 这两个状态似乎没什么用了。。。
     * 因为我并不会在多个弹窗弹出的时候管理他们。。。
     */
    var _STATUS_OPEN = 'open';

    var _STATUS_CLOSE = 'close';

    /**
     * 将会把animate函数放在这里,当改变animate函数的时候
     * 会传递到prototype上，
     * 意义不咋
     * @type {Object}
     */
    var _config = {
        defaultTemplate: [
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
        ].join(''),
        defaultzIndex: 1988,
        defaultCache: [],
    };

    var _noop = function () {};

    var _PREFIX_REG = /^qie-dialog-/;

    var _PREFIX_DEFAULT_REG = /^qie/;

    /**
     * 通过cssText设置样式
     * 注意，这样设置样式会清空之前设置的样式
     * @param  {[type]} el     [description]
     * @param  {[type]} styles [description]
     * @return {[type]}        [description]
     */
    var _css = function (el, styles) {
        el.style.cssText = styles;
    };

    /**
     * [_hide description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    var _hide = function (obj) {
        obj.style.display = 'none';
    };

    /**
     * [_show description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    var _show = function (obj) {
        obj.style.display = 'block';
    };

    var _html = function (obj, html) {
        obj.innerHTML = html;
    };

    /**
     * 转换成驼峰写法
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    var _transToCamels = function (str) {
        var arr = str.split('-');

        for (var i = 1, len = arr.length; i < len; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1);
        }
        return arr.join('');
    };

    var __toString = Object.prototype.toString;

    var __indexOf = Array.prototype.indexOf;

    var __trim = String.prototype.trim;

    var __slice = Array.prototype.slice;

    var _type = function (type) {
        return function (obj) {
            return __toString.call(obj) === '[object ' + type + ']';
        };
    };

    /**
     * 兼容写法最终都会被删除
     */
    var _isArray = (function () {
        if (Array.isArray) {
            return Array.isArray;
        }
        return _type('Array');
    })();

    /**
     * [description]
     * @param  {[type]} arr [description]
     * @param  {[type]} s   [description]
     * @return {[type]}     [description]
     */
    var _inArray = (function () {
        if (__indexOf) {
            return function (arr, s) {
                return !!~__indexOf.call(arr, s);
            };
        }
       return function (arr, s) {
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === s) {
                    return true;
                }
            }
            return false;
        };
    })();

    /**
     * [description]
     * @param  {[type]} str  [description]
     * @return {[type]}      [description]
     */
    var _trim = (function () {
        if (__trim) {
            return function (str) {
                return __trim.call(str);
            };
        }
        return function (str) {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    })();

    var _dom = document.createElement('a');

    /**
     * [description]
     * @param  {[type]} elm  [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    var _hasClass = (function () {
        if (_dom.classList) {
            return function (elm, name) {
                return elm.classList.contains(name);
            };
        }
        return function (elm, name) {
            return el.className.match(new RegExp('(\\s|^)(' + name + ')(\\s|$)'));
        };
    })();

    /**
     * [description]
     * @param  {[type]} elm  [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    var _addClass = (function () {
        if (_dom.classList) {
            return function (elm, name) {
                if (elm && name && !_hasClass(elm, name)) {
                    elm.classList.add(name);
                }
            };
        }
        return function (elm, name) {
            if (elm && name && !_hasClass(elm, name)) {
                elm.className += _trim(elm.className) + ' ' + name;
            }
        };
    })();

    /**
     * [description]
     * @param  {[type]} elm  [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    var _removeClass = (function () {
        if (_dom.classList) {
            return function (elm, name) {
                if (elm && name && _hasClass(elm, name)) {
                    elm.classList.remove(name);
                }
            };
        }
        return function (elm, name) {
            if (elm && name && _hasClass(elm, name)) {
                el.className = el.className.replace(RegExp('(\\s|^)(' + cls + ')(\\s|$)'), '$3');
            }
        };
    })();

    var _ElementExp = /Element/;

    var _isDom = function (obj) {
        return _ElementExp.test(__toString.call(obj));
    };

    var _MAXLENGTH = 4294967296;

    var _isArrayLike = function (o) {
        if (
            o &&
            typeof o === 'object' &&
            isFinite(o.length) &&
            o.length >= 0 &&
            o.length === Math.floor(o.length) &&
            o.length < _MAXLENGTH
        ) {
            return true;
        }
        return false;
    };

    /**
     * [_toArray description]
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    var _toArray = function (arr) {
        if (arr === undefined) {
            return [];
        }
        if (!_isArrayLike(arr)) {
            arr = [arr];
        }
        return __slice.call(arr);
    };

    var _isObject = _type('Object');

    var _isFunction = _type('Function');

    var _isString = _type('String');

    /**
     * [_extend description]
     * @return {[type]} [description]
     */
    var _extend = function () {
        var args = arguments;
        var main;
        var extend;

        if (!args.length) {
            return;
        }

        if (!_isObject(extend)) {
            return;
        }

        if (args.length === 1) {
            main = DialogProto;
            extend = args[0];
        }

        if (args.length === 2) {
            main = args[0];
            extend = args[1];
        }

        for (var property in extend) {
            if (extend.hasOwnProperty(property) && !main[property]) {
                main[property] = extend[property];
            }
        }
    };

    /**
     * [_random description]
     * @return {[type]} [description]
     */
    var _random = function () {
        return Math.random().toString(16).substring(2);
    };

    /**
     * [_observable description]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    var _observable = function (ctx) {
        ctx = ctx || {};

        var _callback = {};

        /**
         * [trigger description]
         * @return {[type]} [description]
         */
        ctx.trigger = function () {
            var argv = _toArray(arguments);
            var name = argv[0];
            if (_callback[name]) {
                for (var i = 0, len = _callback[name].length; i < len; i++) {
                    _callback[name][i].apply(_callback[name][i].ctx || ctx, argv.slice(1));
                }
            }
        };

        /**
         * [off description]
         * @param  {[type]}   name [description]
         * @param  {Function} fn   [description]
         * @return {[type]}        [description]
         */
        ctx.off = function (name, fn) {
            if (!name) {
                _callback = {};
                return;
            }

            if (!fn) {
                _callback[name] = [];
                return;
            }

            if (_callback[name]) {
                for (var i = 0, len = _callback[name].length; i < len; i++) {
                    if (_callback[name][i] === fn) {
                        return _callback[name].splice(i, 1);
                    }
                }
            }
        };

        /**
         * [on description]
         * @param  {[type]}   name [description]
         * @param  {Function} fn   [description]
         * @return {[type]}        [description]
         */
        ctx.on = function (name, fn) {
            if (isArray(fn)) {
                fn.ctx = name;
                ctx.on(fn[0], fn[1]);
                return;
            }
            var _callbacks = _callback[name] ? _callback[name] : (_callback[name] = []);
            _callbacks.push(fn);
        };

        return ctx;
    };

    var _every = function (arr, fn) {
        var len = arr.length;
        var i = 0;
        while (i < len) {
            var value = arr[i];
            if (!fn.call(null, value, i)) {
                return false;
            }
            i++;
        }

        return true;
    };



    /**
     * [Dialog description]
     * @param {[type]} options [description]
     */
    function Dialog(options) {
        if ((this instanceof Dialog) === false) {
            return new Dialog(options);
        }

        this.init(options);
    }

    /**
     * [set description] 目前来说没什么需要防止的
     * @param {[type]} key   [description]
     * @param {[type]} value [description]
     */
    Dialog.set = function (key, value) {
        if (_PREFIX_DEFAULT_REG.test(key)) {
            throw new Error('Word `default` can\'t be use as key\'s prefix');
        }
        _config[key] = value;
        return Dialog;
    };

    /**
     * [get description]
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    Dialog.get = function (key) {
        return _config[key];
    };

    Dialog.opened = function () {
        var list = Dialog.get('defaultCache');
        if (list.length === 0) {
            return false;
        }
        return _every(list, function (item, i) {
            return item._status === 'open';
        });
    };

    var util = {
        /**
         * [inArray description]
         * @param  {[type]} arr [description]
         * @param  {[type]} s   [description]
         * @return {[type]}     [description]
         */
        inArray: function (arr, s) {
            if (!_isArray(arr) || s === undefined) {
                return false;
            }
            return _inArray(arr, s);
        },
        isArray: _isArray,
        isObject: _isObject,
        isFunction: _isFunction,
        isString: _isString,
        /**
         * [hasClass description]
         * @param  {[type]}  elm       [description]
         * @param  {[type]}  className [description]
         * @return {Boolean}           [description]
         */
        hasClass: function (elm, className) {
            if (!elm || !className) {
                return false;
            }
            return _hasClass(elm, className);
        },
        trim: _trim,
        addClass: _addClass,
        removeClass: _removeClass,
        isDom: _isDom,
        toArray: _toArray,
        extend: _extend,
        observable: _observable,
        randomStr: _random,
        isArrayLike: _isArrayLike,
        hide: _hide,
        show: _show,
        css: _css,
        toCamels: _transToCamels,
        every: _every
    };

    Dialog.util = util;

    Dialog.VERSION = '1.0.0';

    // 按钮设计
    // botton: [{
    //  id: 'xxx',
    //  value: '',
    //  callback: ''
    // }]

    // 自定义

    var DialogProto = Dialog.prototype;

    DialogProto.init = function (options) {
        _observable(this);
        this.options = options;
        this._id = _random();
        this.btnGroups = [];

        if (options.initlize) {
            this._status = _STATUS_OPEN;
        }
        else {
            this._status = _STATUS_CLOSE;
        }

        this._create();

        this._getDom();

        this._initMask();

        this._initHeader();

        this._initContent();

        this._initFooter();

        this._initVisible();

        this._setPos();

        this._bindEvt();

        var _cache = Dialog.get('defaultCache');

        _cache.push(this);

    };

    var _addEvent = (function () {
        if (window.addEventListener) {
            return function (el, evt, fn) {
                el.addEventListener(evt, fn, false);
            }
        }
        return function (el, evt, fn) {
            el.attachEvent('on' + evt, fn);
        }
    })();

    var _removeEvent = (function () {
        if (window.removeEventListener) {
            return function (el, evt, fn) {
                el.removeEventListener(evt, fn, false);
            }
        }
        return function (el, evt, fn) {
            el.detachEvent('on' + evt, fn);
        }
    })();

    DialogProto.resize = function () {
        self._setPos();
    };

    DialogProto._bindEvt = function () {
        var self = this;

        var _close = function () {
            self.trigger('close');
        };

        self._customCallback = [{
            tag: 'wrap',
            evt: 'dbclick',
            fn: _close
        },
        {
            tag: 'close',
            evt: 'click',
            fn: _close
        }];

        _addEvent(self.dom.wrap, 'dbclick', _close);

        _addEvent(self.dom.close, 'close', _close);

        if (self.options.events) {
            for (var i = 0, len = self.options.events.length; i < len; i++) {
                var evt = self.options.events[i];
                if (self.dom[evt.tag]) {
                    var fn = function (evt) {
                        evt.fn.call(self.dom, evt);
                    };
                    var cb = {
                        evt: evt.evt,
                        tag: evt.tag,
                        fn: fn
                    };
                    _addEvent(self.dom[evt.tag], evt.evt, fn);
                    _customCallback.push(cb);
                }
            }
        }
    };

    DialogProto._initVisible = function () {
        if (this.options.visible) {
            this.show();
        }
        else {
            this.hide()
        }
    };

    DialogProto.show = function () {
        this.dom.mask.style.visibility = 'visible';
    };

    DialogProto.hide = function () {
        this.dom.mask.style.visibility = 'hidden';
    };

    DialogProto.visible = function (booleanVal) {
        if (booleanVal === undefined) {
            return this.dom.mask.style.visibility !== 'hidden';
        }
        else {
            if (booleanVal) {
                this.show();
            }
            else {
                this.hide();
            }
        }
    };

    DialogProto._initContent = function () {
        var content = this.options.content || '';
        this.content(content);
    };

    DialogProto._getDom = function () {
        var wrap = document.getElementById(this.id);
        this.dom = {};
        var elements = wrap.getElementsByTagName('*');

        for (var i = 0, len = elements.length; i < len; i++) {
            var name = _transToCamels(elements[i].className.replace(_PREFIX_REG, ''));
            this.dom[name] = elements[i];
        }
        this.dom.wrap = wrap;
    };

    DialogProto._create = function () {
        var body = document.body;
        var wrap = document.createElement('div');
        _css(wrap, 'position:absolute;left:0;top:0;');
        wrap.id = this._id;
        if (this.options.theme) {
            wrap.className = this.options.theme;
        }
        var template = Dialog.get('template') || Dialog.get('defaultTemplate')
        _html(wrap, template);
        document.body.appendChild = wrap;
    };

    DialogProto._setPos = function () {
        var dialogWidth = this.dom.dialog.offsetWidth;
        var dialogHeight = this.dom.dialog.offsetHeight;
        var left = 0;
        var top = 0;
        if (this.options.lock) {
            var maskWidth = this.dom.mask.offsetWidth;
            var maskHeight = this.dom.mask.offsetHeight;
            left = (maskWidth - dialogWidth) / 2;
            top = (maskHeight - dialogHeight) / 2;
        }
        else {
            var rootElement = document.documentElement;
            var windowWidth = rootElement.clientWidth;
            var windowHeight = rootElement.clientHeight;
            left = (windowWidth - dialogWidth) / 2;
            top = (windowHeight - dialogHeight) / 2;
        }

        var zIndex = (this.options.zIndex || Dialog.get('defaultzIndex')) + 1;

        var css = [
            'position:absolute',
            'zIndex:' + zIndex,
            'left:' + parseInt(left) + 'px',
            'top:' + parseInt(top) + 'px'
        ].join(';');
        _css(this.dom.dialog, css);
    };

    DialogProto._initMask = function () {
        var css = [
            'position:fixed',
            'z-index:' + (this.options.zIndex || Dialog.get('defaultzIndex')),
            'left:0',
            'top:0',
            'right:0',
            'bottom:0',
            'margin:auto',
            'overflow:hidden',
        ];
        if (this.options.lock) {
            _css(this.dom.mask, css.join(';'));
        }
    };

    DialogProto.destroy = function () {
        for (var i = 0, len = this.btnGroups.length; i < len; i++) {
            this.btnGroups[i].free();
        }

        this.btnGroups = [];

        this.off();

        for (var i = 0, len = this._customCallback; i < len; i++) {
            var evt = this._customCallback[i];
            _removeEvent(this.dom[evt.tag], evt.evt, evt.fn);
        }

        var _cache = Dialog.get('defaultCache');

        for (var i = 0, len = _cache.length; i < len; i++) {
            if (_cache[i] === this) {
                _cache.splice(i, 1);
            }
        }

        var dom = document.getElementById(this._id);

        var parent = dom.parentNode;

        parent.removeChild(dom);

        this.options = null;
        this._id = null;
    };

    DialogProto.close = function () {
        this.destroy();
    };

    DialogProto.lock = function () {
        this.options.lock = true;
        this._initMask();
        this._setPos();
    };

    DialogProto.unlock = function () {
        this.options.lock = false;
        this._initMask();
        this._setPos();
    };

    DialogProto._initHeader = function () {
        if (this.options.header === false) {
            _hide(this.dom.header);
            return;
        }

        this._initClose();

        var title = this.title || '';

        this.title(title);
    };

    DialogProto._initFooter = function () {
        if (this.options.footer === false) {
            _hide(this.dom.footer);
            return;
        }

        var buttons = this.options.buttons || [];

        this.button(buttons);
    };

    DialogProto._initClose = function () {
        if (this.options.closebtn === false) {
            _hide(this.dom.close);
        }
    };

    DialogProto.title = function (title) {
        _html(this.dom.title, title);
        this._setPos();
    };

    function Button(wrap, options) {
        this.init(wrap, options);
    };

    var ButtonProto = Button.prototype;

    ButtonProto.init = function (wrap, options) {
        this.wrap = wrap;
        this.options = options;
        var newButton = document.createElement('input');
        newButton.type = 'button';
        newButton.value = this.options.value || '';
        newButton.id = this.options.id;
        newButton.className = 'qie-dialog-btn' + this.options.className ? ' ' + this.options.className : '';
        this.wrap.appendChild(newButton);
        this.dom = newButton;
        newButton.onclick = this.options.callback || _noop;
        if (this.options.proxy) {
            this.proxy(this.options.proxy);
        }

        if (this.options.disabled !== undefined) {
            this.disable(this.options.disabled);
        }
    };

    ButtonProto.disable = function (disabled) {
        if (disabled === undefined) {
            if (this.dom.hasAttribute) {
                return this.dom.hasAttribute('disabled');
            }
            else {
                return this.dom.getAttribute('disabled') !== null;
            }
        }
        disabled = !!disabled;
        if (disabled) {
            this.dom.setAttribute('disabled', 'disabled')
        }
        else {
            this.dom.removeAttribute('disabled');
        }
    };

    ButtonProto.free = function () {
        this.dom.onclick = null;
        this.wrap = null;
        this.options = null;
        this.dom = null;
    };

    ButtonProto.proxy = function (fn) {
        var cb = this.dom.onclick;

        this.dom.onclick = function (evt) {
            if (fn(evt)) {
                cb(evt);
            }
        };
    };

    ButtonProto.value = function (v) {
        if (v) {
            this.dom.value = v;
            return;
        }
        return this.dom.value;
    };

    ButtonProto.show = function (v) {
        _show(this.dom);
    };

    ButtonProto.hide = function (v) {
        _hide(this.dom);
    };

    DialogProto.button = function (list) {
        for (var i = 0, len = list.length; i < len; i++) {
            this.btnGroups.push(new Button(this.dom.buttons, list[i]));
        }
        this._setPos();
    };

    /**
     * 设置内容
     * @return {[type]} [description]
     */
    DialogProto.content = function (htmlstr) {
        _html(this.dom.content, htmlstr);
        this._setPos();
    };

    /**
     * 设置时间
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    DialogProto.time = function () {
    };

    _addEvent(window, 'resize', function () {
        var list = Dialog.get('defaultCache');
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].resize();
        }
    })

    DialogProto.animate = function () {};

    module.exports = Dialog;
})();

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
        template: [
            '<div class="qie-dialog-mask">',
                '<div class="qie-dialog">',
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
        ].join('')
    };

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
        toCamels: _transToCamels
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

        this._initlize();
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
        _html(wrap, Dialog.get('template'));
        document.body.appendChild = wrap;
    };

    DialogProto._initPos = function () {};

    DialogProto._initMask = function () {};

    DialogProto._initTitle = function () {};

    DialogProto._initButton = function () {};

    DialogProto.open = function () {};

    DialogProto.close = function () {};

    DialogProto.lock = function () {};

    DialogProto.unlock = function () {};

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
    };

    function Button(wrap, options) {
        this.init(wrap, options);
    };

    var ButtonProto = Button.prototype;

    var _noop = function () {};

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
        // this.dom.disabled = !!disabled;
        disabled = !!disabled;
        if (disabled) {
            this.dom.addAttribute('disabled', 'disabled')
        }
        else {
            this.dom.removeAttribute('disabled');
        }
    };

    ButtonProto.free = function () {
        this.dom.onclick = null;
        this.wrap.removeChild(this.dom);
        this.wrap = null;
        this.options = null;
        this.dom = null;
    };

    ButtonProto.proxy = function (fn) {
        var cb = this.dom.onclick;

        this.dom.onclick = function (evt) {
            if (fn()) {
                cb();
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
            this.btnGroups.push(new Button(list[i]));
        }
    };

    /**
     * 设置内容
     * @return {[type]} [description]
     */
    DialogProto.content = function (htmlstr) {
        _html(this.dom.content, htmlstr);
    };

    /**
     * 设置时间
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    DialogProto.time = function () {
    };

    DialogProto.animate = function () {};

    module.exports = Dialog;
})();

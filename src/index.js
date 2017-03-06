/**
 * Empty module
 */
(function() {
    'use strict';

    function Dialog(options) {
        if ((this instanceof Dialog) === false) {
            return new Dialog(options);
        }
    }

    var DialogProto = Dialog.prototype;

    DialogProto.init = function () {
        _observable(this);
    };

    DialogProto.open = function () {};

    DialogProto.close = function () {};

    DialogProto.lock = function () {};

    DialogProto.unlock = function () {};

    DialogProto.title = function () {};

    /**
     * 显示
     * @return {[type]} [description]
     */
    DialogProto.show = function () {
        this._d.display = 'block';
    };

    /**
     * 隐藏
     * @return {[type]} [description]
     */
    DialogProto.hide = function () {
        this._d.display = 'none';
    };

    /**
     * 设置内容
     * @return {[type]} [description]
     */
    DialogProto.content = function (htmlstr) {
        this._c.innerHTML = htmlstr;
    };

    /**
     * 设置时间
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    DialogProto.time = function () {
    };

    DialogProto.animate = function () {};

    DialogProto.on = function () {};

    DialogProto.off = function () {};

    DialogProto.trigger = function () {};

    var __toString = Object.prototype.toString;

    var __indexOf = Array.prototype.indexOf;

    var __trim = String.prototype.trim;

    var __slice = Array.prototype.slice;

    var _type = function (type) {
        return function (obj) {
            return __toString.call(obj) === '[object ' + type + ']';
        };
    };

    var _isArray = (function () {
        if (Array.isArray) {
            return Array.isArray;
        }
        else {
            return _type('Array');
        }
    })();

    var _inArray = (function () {
        if (__indexOf) {
            return function (arr, s) {
                return !!~__indexOf.call(arr, s);
            };
        }
        else {
            return function (arr, s) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] === s) {
                        return true;
                    }
                }
                return false;
            };
        }
    })();

    /**
     * trim
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
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

    var _isArrayLike = function (o) {
        if (
            o &&
            typeof o === 'object' &&
            isFinite(o.length) &&
            o.length >= 0 &&
            o.length === Math.floor(o.length) &&
            o.length < 4294967296
        ) {
            return true;
        }
        return false;
    };

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

    var _observable = function (ctx) {
        ctx = ctx || {};

        var _callback = {};

        ctx.trigger = function () {
            var argv = _toArray(arguments);
            var name = argv[0];
            if (_callback[name]) {
                for (var i = 0, len = _callback[name].length; i < len; i++) {
                    _callback[name][i].apply(_callback[name][i].ctx || ctx, argv.slice(1));
                }
            }
        };

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

    var util = {
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
        extend: _extend
    };

    Dialog.util = util;

    Dialog.VERSION = '1.0.0';

    Dialog.animate = function () {};

    module.exports = Dialog;
})();

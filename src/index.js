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

    DialogProto.init = function () {};

    DialogProto.open = function () {};

    DialogProto.close = function () {};

    DialogProto.lock = function () {};

    DialogProto.unlock = function () {};

    DialogProto.title = function () {};

    DialogProto.show = function () {};

    DialogProto.hide = function () {};

    DialogProto.content = function () {};

    DialogProto.time = function () {};

    DialogProto._animate = function () {};

    DialogProto.on = function () {};

    DialogProto.off = function () {};

    DialogProto.trigger = function () {};

    var _type = function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
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
        if (Array.prototype.indexOf) {
            return function (arr, s) {
                return !!~Array.prototype.indexOf.call(arr, s);
            }
        }
        else {
            return function (arr, s) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] === s) {
                        return true;
                    }
                }
                return false;
            }
        }
    })();

    var _dom = document.createElement('a');

    var _hasClass = (function () {
        if (_dom.classList) {
            return function (elm, name) {
                return elm.classList.contains(name);
            }
        }
        return function (elm, name) {
            return el.className.match(new RegExp('(\\s|^)(' + name + ')(\\s|$)'));
        }
    })();


    var util = {
        inArray: function (arr, s) {
            if (!_isArray(arr) || s === undefined) {
                return false;
            }
            return _inArray(arr, s);
        },
        isArray: _isArray,
        isObject: _type('Object'),
        isFunction: _type('Function'),
        isString: _type('String'),
        hasClass: function (elm, className) {
            if (!elm || !className) {
                return false;
            }
            return _hasClass(elm, className);
        },
        trim: function () {},
        addClass: function () {},
        removeClass: function () {},
        isDom: function () {},
        toArray: function () {},
        IU: function () {},
        extend: function () {}
    };

    Dialog.util = util;

    Dialog.VERSION = '1.0.0';

    Dialog.EASING = [];

    Dialog.NODE_TYPE = {};

    Dialog.plugins = {};

    Dialog.animate = function () {};

    module.exports = Dialog;
})();

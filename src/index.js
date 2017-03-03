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



    var util = {
        inArray: function () {},
        isArray: function () {},
        isObject: function () {},
        isFunction: function () {},
        isString: function () {},
        hasClass: function () {},
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

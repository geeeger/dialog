import Dialog from 'dist/index';
import { expect, assert } from 'chai';

describe('测试构造器', () => {
    let dialog;

    beforeEach(() => {
        dialog = new Dialog();
    });

    it('如果用户不用new关键字调用该类，应该正确处理', () => {
        let dialogInstance = Dialog();
        expect(dialogInstance instanceof Dialog).to.equal(true)
    });

    it('可以用new关键字实例化', () => {
        let dialogInstance = new Dialog();
        expect(dialogInstance instanceof Dialog).to.equal(true)
    });
});

describe('测试实例属性和方法', () => {
  let dialog;

  let methods = {
    'init': 'function',
    'open': 'function',
    'close': 'function',
    'lock': 'function',
    'unlock': 'function',
    'title': 'function',
    'show': 'function',
    'hide': 'function',
    'content': 'function',
    'time': 'function',
    '_animate': 'function',
    'on': 'function',
    'off': 'function',
    'trigger': 'function'
  };

  beforeEach(() => {
    dialog = new Dialog();
  });

  for (let method in methods) {
    it('在原型链上应该存在方法：' + method, () => {
        expect(typeof dialog[method]).to.equal(methods[method])
    })
  }
});

describe('测试静态属性和方法', () => {

    let methods = {
        'util': {
            'inArray': 'function',
            'isArray': 'function',
            'isObject': 'function',
            'isFunction': 'function',
            'isString': 'function',
            'hasClass': 'function',
            'trim': 'function',
            'addClass': 'function',
            'removeClass': 'function',
            'isDom': 'function',
            'toArray': 'function',
            'IU': 'function',
            'extend': 'function'
        },
        'VERSION': 'string',
        'EASING': 'array',
        'NODE_TYPE': 'object',
        'plugins': 'object',
        'animate': 'function'
    };

    function istype(obj) {
        return Object.prototype
            .toString
            .call(obj)
            .match(/\[object (.*)\]/)[1]
            .toLowerCase();
    }

    function _each(obj, callback, namespace) {
        for (let method in obj) {
            if (istype(obj[method]) === 'object') {
                namespace.push(method);
                _each(obj[method], callback, namespace);
            }
            else {
                callback(obj[method], method, namespace);
            }
        }
    }

    function each(obj, callback) {
        for (let method in obj) {
            if (istype(obj[method]) === 'object') {
                _each(obj[method], callback, [method]);
            }
            else {
                callback(obj[method], method);
            }
        }
    }

    function getProperty(obj, namespace) {
        let namespacecopy = namespace.slice();
        namespacecopy.splice(0, 1, obj[namespacecopy[0]]);
        return namespacecopy.reduce(function (a, b) {
            return a[b];
        });
    }

    each(methods, (type, methodName, namespace) => {
        let _namespace = namespace ? namespace.slice() : [];
        _namespace.push(methodName);
        it('应该存在属性或方法：' + _namespace.join('.'), () => {
            expect(istype(getProperty(Dialog, _namespace))).to.equal(type)
        });
    });

    describe('测试util.inArray方法', () => {
        it('util.inArray方法,未找到元素', () => {
            expect(Dialog.util.inArray()).to.be.false;
            expect(Dialog.util.inArray([1,2])).to.be.false;
            expect(Dialog.util.inArray([], undefined)).to.be.false;
            expect(Dialog.util.inArray([1,2], -1)).to.be.false;
            expect(Dialog.util.inArray([1,2,undefined,4,5], undefined)).to.be.false;
        });

        it('util.inArray方法,找到元素', () => {
            expect(Dialog.util.inArray([1,2,3,4,5], 4)).to.be.true;
            expect(Dialog.util.inArray([1,2,3,4,-1], -1)).to.be.true;
            expect(Dialog.util.inArray([1,2,0,4,2], 2)).to.be.true;
        })
    });

    describe('测试util.isArray', () => {
        it('输入为各种类型', () => {
            expect(Dialog.util.isArray(arguments)).to.be.false;
            expect(Dialog.util.isArray({})).to.be.false;
            expect(Dialog.util.isArray(function () {})).to.be.false;
            expect(Dialog.util.isArray([])).to.be.true;
            expect(Dialog.util.isArray(document.querySelectorAll('*'))).to.be.false;
            expect(Dialog.util.isArray()).to.be.false;
            expect(Dialog.util.isArray(new Error())).to.be.false;
            expect(Dialog.util.isArray(new Date())).to.be.false;
            expect(Dialog.util.isArray(new Array())).to.be.true;
            expect(Dialog.util.isArray('1')).to.be.false;
            expect(Dialog.util.isFunction(new String('1'))).to.be.false;
            expect(Dialog.util.isArray(1)).to.be.false;
            expect(Dialog.util.isArray(true)).to.be.false;
            expect(Dialog.util.isArray(null)).to.be.false;
            expect(Dialog.util.isArray(undefined)).to.be.false;
        });
    });

    describe('测试util.isObject', () => {
        it('输入为各种类型', () => {
            function Test() {};

            function Test2() {};

            Test2.prototype.constructor = new Object();

            expect(Dialog.util.isObject(arguments)).to.be.false;
            expect(Dialog.util.isObject({})).to.be.true;
            expect(Dialog.util.isObject(new Object())).to.be.true;
            expect(Dialog.util.isObject(new Test())).to.be.true;
            expect(Dialog.util.isObject(new Test2())).to.be.true;
            expect(Dialog.util.isObject(Test)).to.be.false;
            expect(Dialog.util.isObject(function () {})).to.be.false;
            expect(Dialog.util.isObject([])).to.be.false;
            expect(Dialog.util.isObject(document.querySelectorAll('*'))).to.be.false;
            expect(Dialog.util.isObject()).to.be.false;
            expect(Dialog.util.isObject(new Error())).to.be.false;
            expect(Dialog.util.isObject(new Date())).to.be.false;
            expect(Dialog.util.isObject(new Array())).to.be.false;
            expect(Dialog.util.isObject('1')).to.be.false;
            expect(Dialog.util.isObject(new String('1'))).to.be.false;
            expect(Dialog.util.isObject(1)).to.be.false;
            expect(Dialog.util.isObject(true)).to.be.false;
            expect(Dialog.util.isObject(null)).to.be.false;
            expect(Dialog.util.isObject(undefined)).to.be.false;
        });
    });


    describe('测试util.isFunction', () => {
        it('输入为各种类型', () => {
            function Test() {};

            function Test2() {};

            Test2.prototype.constructor = new Object();

            expect(Dialog.util.isFunction(arguments)).to.be.false;
            expect(Dialog.util.isFunction({})).to.be.false;
            expect(Dialog.util.isFunction(new Object())).to.be.false;
            expect(Dialog.util.isFunction(new Test())).to.be.false;
            expect(Dialog.util.isFunction(new Test2())).to.be.false;
            expect(Dialog.util.isFunction(Test)).to.be.true;
            expect(Dialog.util.isFunction(function () {})).to.be.true;
            expect(Dialog.util.isFunction(new Function())).to.be.true;
            expect(Dialog.util.isFunction([])).to.be.false;
            expect(Dialog.util.isFunction(document.querySelectorAll('*'))).to.be.false;
            expect(Dialog.util.isFunction()).to.be.false;
            expect(Dialog.util.isFunction(new Error())).to.be.false;
            expect(Dialog.util.isFunction(new Date())).to.be.false;
            expect(Dialog.util.isFunction(new Array())).to.be.false;
            expect(Dialog.util.isFunction('1')).to.be.false;
            expect(Dialog.util.isFunction(new String('1'))).to.be.false;
            expect(Dialog.util.isFunction(1)).to.be.false;
            expect(Dialog.util.isFunction(true)).to.be.false;
            expect(Dialog.util.isFunction(null)).to.be.false;
            expect(Dialog.util.isFunction(undefined)).to.be.false;
        });
    });

    describe('测试util.isString', () => {
        it('输入为各种类型', () => {
            function Test() {};

            function Test2() {};

            Test2.prototype.constructor = new Object();

            expect(Dialog.util.isString(arguments)).to.be.false;
            expect(Dialog.util.isString({})).to.be.false;
            expect(Dialog.util.isString(new Object())).to.be.false;
            expect(Dialog.util.isString(new Test())).to.be.false;
            expect(Dialog.util.isString(new Test2())).to.be.false;
            expect(Dialog.util.isString(Test)).to.be.false;
            expect(Dialog.util.isString(function () {})).to.be.false;
            expect(Dialog.util.isString(new Function())).to.be.false;
            expect(Dialog.util.isString([])).to.be.false;
            expect(Dialog.util.isString(document.querySelectorAll('*'))).to.be.false;
            expect(Dialog.util.isString()).to.be.false;
            expect(Dialog.util.isString(new Error())).to.be.false;
            expect(Dialog.util.isString(new Date())).to.be.false;
            expect(Dialog.util.isString(new Array())).to.be.false;
            expect(Dialog.util.isString('1')).to.be.true;
            expect(Dialog.util.isString(new String('1'))).to.be.true;
            expect(Dialog.util.isString(1)).to.be.false;
            expect(Dialog.util.isString(true)).to.be.false;
            expect(Dialog.util.isString(null)).to.be.false;
            expect(Dialog.util.isString(undefined)).to.be.false;
        });
    });

    describe('测试util.hasClass', () => {

        it('查找到class', () => {
            let body = document.body;
            body.classList.add('a')
            body.classList.add('a-1')
            body.classList.add('a_1')
            expect(Dialog.util.hasClass(body, 'a')).to.be.true;
            expect(Dialog.util.hasClass(body, 'a-1')).to.be.true;
            expect(Dialog.util.hasClass(body, 'a_1')).to.be.true;
        });

        it('查找不到class', () => {
            let body = document.body;
            expect(Dialog.util.hasClass(body)).to.be.false;
            expect(Dialog.util.hasClass()).to.be.false;
            expect(Dialog.util.hasClass(body, 'b')).to.be.false;
            expect(Dialog.util.hasClass(body, 'b-1')).to.be.false;
            expect(Dialog.util.hasClass(body, 'b_1')).to.be.false;
        });
    });

    describe('测试util.removeClass', () => {

        it('删除成功', () => {
            let body = document.body;
            body.className = '';
            body.classList.add('test');
            body.classList.add('test-1');
            body.classList.add('test_1');
            expect(Dialog.util.removeClass(body, 'test')).to.equal('test');
            expect(body.className).to.equal('test-1 test_1');
            expect(Dialog.util.removeClass(body, 'test-1')).to.equal('test-1');
            expect(body.className).to.equal('test_1');
            expect(Dialog.util.removeClass(body, 'test_1')).to.equal('test_1');
            expect(body.className).to.equal('');
        });

        it('删除不成功', () => {
            let body = document.body;
            body.className = '';
            body.classList.add('test');
            body.classList.add('test-1');
            body.classList.add('test_1');
            expect(Dialog.util.removeClass(body, 'test2')).to.equal('');
            expect(body.className).to.equal('test test-1 test_1');
            body.className = '';
            expect(Dialog.util.removeClass(body, 'test2')).to.equal('');
            expect(body.className).to.equal('');
        });
    });

});


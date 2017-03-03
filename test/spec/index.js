import Dialog from 'dist/index';
import { expect } from 'chai';

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
    })
});

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


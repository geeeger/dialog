import Dialog from 'dist/index';
import { expect } from 'chai';

describe('Test instance method', () => {
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
    it('Dialog should have method ' + method + ' in prototype', () => {
        expect(typeof dialog[method]).to.equal(methods[method])
    })
  }
});

describe('Test static method and property', () => {

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

    function each(obj, callback) {
        for (let method in obj) {
            if (typeof obj[method] === 'object') {
                each(obj[method], callback);
            }
            else {
                callback(obj[method], method);
            }
        }
    }

    each(methods, (type, methodName) => {
        it('should have static method ' + methodName, () => {
            expect(typeof Dialog[methodName]).to.equal(type)
        });
    })
});

describe('Test Contructor', () => {
    let dialog;

    beforeEach(() => {
        dialog = new Dialog();
    });

    it('should return an instance if user call it without keyword "new"', () => {
        let dialogInstance = Dialog();
        expect(dialogInstance instanceof Dialog).to.equal(true)
    });

    it('shold return an instance if user call it with keyword "new"', () => {
        let dialogInstance = new Dialog();
        expect(dialogInstance instanceof Dialog).to.equal(true)
    });
});


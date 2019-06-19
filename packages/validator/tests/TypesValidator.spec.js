import 'core-js/shim';
import 'regenerator-runtime/runtime';

import API from '../src';

const { TypesValidator, vlt } = API;

describe('TypesValidator tests', () => {
  test('test many functions', () => {
    let result;

    result = TypesValidator.isArray([1, 3, '']);
    expect(result).toBe(true);
    result = TypesValidator.isArray(3232);
    expect(result).toBe(false);

    result = TypesValidator.isArrayOf([1, 2, 3, 4], 'number');
    expect(result).toBe(true);
    result = TypesValidator.isArrayOf([], 'number');
    expect(result).toBe(false);

    result = TypesValidator.isBoolean(true);
    expect(result).toBe(true);
    result = TypesValidator.isBoolean('true');
    expect(result).toBe(false);

    result = TypesValidator.isFunction(() => {});
    expect(result).toBe(true);
    result = TypesValidator.isFunction({});
    expect(result).toBe(false);

    result = TypesValidator.isNumber(-24343);
    expect(result).toBe(true);
    result = TypesValidator.isNumber('4343');
    expect(result).toBe(false);
    result = TypesValidator.isNumber(NaN);
    expect(result).toBe(false);

    result = TypesValidator.isObject({});
    expect(result).toBe(true);
    result = TypesValidator.isObject(() => {});
    expect(result).toBe(false);
    result = TypesValidator.isObject([]);
    expect(result).toBe(false);

    result = TypesValidator.isString('');
    expect(result).toBe(true);
    result = TypesValidator.isString(3);
    expect(result).toBe(false);

    result = TypesValidator.isVLTObjectScheme(vlt.scheme({}));
    expect(result).toBe(true);
    result = TypesValidator.isVLTObjectScheme({});
    expect(result).toBe(false);

    result = TypesValidator.isPromise(Promise.resolve(true));
    expect(result).toBe(true);
    result = TypesValidator.isPromise(() => {});
    expect(result).toBe(false);

    result = TypesValidator.isDate('2018-04-04');
    expect(result).toBe(true);

    result = TypesValidator.isDate('04-04-2018', 'dd-mm-yyyy');
    expect(result).toBe(true);
    result = TypesValidator.isDate('2018-4-4');
    expect(result).toBe(false);
    result = TypesValidator.isDate('2018-04-4');
    expect(result).toBe(false);
    result = TypesValidator.isDate('2018/04/04');
    expect(result).toBe(false);

    result = TypesValidator.isEmail('d@g.co');
    expect(result).toBe(true);
    result = TypesValidator.isEmail('d@.c');
    expect(result).toBe(false);
  });
});

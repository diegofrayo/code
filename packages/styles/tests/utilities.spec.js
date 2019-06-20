import 'core-js/shim';

import { arrayWithAliases, getUnits, keyMirror, utils } from '../src';

describe('utilities tests', () => {
  test('arrayWithAliases', () => {
    let result;

    result = arrayWithAliases({ name: 'name', email: 'email' });
    expect(result.length).toBe(2);
    expect(result).toEqual(['name', 'email']);
    expect(result.name).toBe('name');
    expect(result.email).toBe('email');
    expect(result[0]).toBe('name');
    expect(result[1]).toBe('email');

    result = arrayWithAliases(['name', 'email'], { age: 'age' });
    expect(result.length).toBe(2);
    expect(result).toEqual(['name', 'email']);
    expect(result.age).toBe('age');
    expect(result.email).toBe(undefined);
    expect(result.name).toBe(undefined);
    expect(result[0]).toBe('name');
    expect(result[1]).toBe('email');
  });

  test('keyMirror', () => {
    let result;

    result = keyMirror({ name: '', email: '' });
    expect(Object.keys(result).length).toBe(2);
    expect(result).toEqual({ name: 'name', email: 'email' });
    expect(result.name).toBe('name');
    expect(result.email).toBe('email');

    result = keyMirror(['name', 'email']);
    expect(Object.keys(result).length).toBe(2);
    expect(result).toEqual({ name: 'name', email: 'email' });
    expect(result.name).toBe('name');
    expect(result.email).toBe('email');
  });

  test('getUnits', () => {
    let result;
    const values = [1, 2, 3, 4, 5];
    values.default = 30;

    result = getUnits(0, values);
    expect(result).toBe(1);

    result = getUnits(2, values);
    expect(result).toBe(3);

    result = getUnits(10, values);
    expect(result).toBe(30);

    values.default = undefined;
    result = getUnits(10, values);
    expect(result).toBe(undefined);

    result = getUnits(10);
    expect(result).toBe('10px');

    result = getUnits('50');
    expect(result).toBe('50');

    result = getUnits('30px');
    expect(result).toBe('30px');
  });

  test('utils - if', () => {
    let result;

    result = utils.if(true, { true: 't', false: 'f' });
    expect(result).toBe('t');

    result = utils.if(false, 't', 'f');
    expect(result).toBe('f');
  });

  test('utils - ifProp', () => {
    let result;

    result = utils.ifProp(true, 'display', 'none');
    expect(result).toBe('display: none;');

    result = utils.ifProp(false, 'display', 'none');
    expect(result).toBe('');
  });

  test('utils - switch', () => {
    let result;
    const values = { name: 'name', email: 'email', default: 'default' };

    result = utils.switch('name', values);
    expect(result).toBe('name');

    result = utils.switch('no', values);
    expect(result).toBe('default');

    delete values.default;
    result = utils.switch('no', values);
    expect(result).toBe(undefined);
  });
});

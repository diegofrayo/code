import 'core-js/shim';
import 'regenerator-runtime/runtime';

import API from '../src';

const { vlt } = API;

describe('scheme tests', () => {
  test('basic test', () => {
    let objectToValidate;
    let validationResult;

    const scheme = vlt.scheme({
      name: vlt().string(),
      email: vlt().email(),
    });

    objectToValidate = { name: 'Diego', email: 'diego@gmail.com' };
    validationResult = scheme.validate(objectToValidate);
    expect(validationResult).toBe(true);

    objectToValidate.email = 'wrong-email';
    validationResult = scheme.validate(objectToValidate);
    expect(validationResult).toBe(false);
  });

  test('basic test - async', async () => {
    let objectToValidate;
    let validationResult;

    const scheme = vlt.scheme({
      name: vlt().string(),
      email: vlt().email(),
    });

    objectToValidate = { name: 'Diego', email: 'diego@gmail.com' };
    validationResult = await scheme.validate(objectToValidate, {
      async: true,
    });
    expect(validationResult).toBe(true);

    objectToValidate.email = 'wrong-email';

    try {
      validationResult = await scheme.validate(objectToValidate, {
        async: true,
      });
    } catch (result) {
      expect(result).toBe(false);
    }
  });

  test('inner shapes and arrayOf', () => {
    let objectToValidate;
    let validationResult;

    const studentScheme = vlt.scheme({
      name: vlt().string(),
      email: vlt().email(),
      age: vlt()
        .number()
        .min(18),
    });

    const teacherScheme = vlt.scheme({
      name: vlt().string(),
      email: vlt().email(),
      isMale: vlt().boolean(),
    });

    const roomScheme = vlt.scheme({
      number: vlt().number(),
      teacher: teacherScheme,
      students: vlt().arrayOf(studentScheme),
    });

    objectToValidate = {
      number: 1,
      teacher: { name: 'Teacher', email: 'email@g.co', isMale: false },
      students: [{ name: 'name', email: 'email@g.co', age: 18 }],
    };
    validationResult = roomScheme.validate(objectToValidate, { getErrors: true });
    expect(validationResult.isValid).toBe(true);

    objectToValidate.students = objectToValidate.students.concat([
      '33',
      3232,
      true,
      [],
      { name: 232, email: 'wrong-email' },
    ]);
    validationResult = roomScheme.validate(objectToValidate, { getErrors: true });

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors[1].message).toMatch('trying to validate a string');
  });
});

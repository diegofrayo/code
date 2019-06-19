import 'core-js/shim';
import 'regenerator-runtime/runtime';

import API from '../src';

const { vlt } = API;

describe('Validator tests', () => {
  test('basic test', () => {
    let dataToValidate;
    let validationResult;

    dataToValidate = 5;
    validationResult = vlt()
      .number()
      .min(5)
      .validate(dataToValidate);
    expect(validationResult).toBe(true);

    dataToValidate = 3;
    validationResult = vlt()
      .number()
      .min(5)
      .validate(dataToValidate);
    expect(validationResult).toBe(false);
  });

  test('basic test - async', async () => {
    let dataToValidate;
    let validationResult;
    let validationRules;

    dataToValidate = [1, 2, 3];
    validationRules = vlt().arrayOf('number');
    validationResult = await validationRules.validate(dataToValidate, {
      async: true,
      getErrors: true,
    });
    expect(validationResult.isValid).toBe(true);

    dataToValidate = 'diego';
    validationRules = vlt()
      .string()
      .allowEmpty()
      .minLength(5)
      .maxLength(10);
    validationResult = validationRules.validate(dataToValidate);
    expect(validationResult).toBe(true);

    dataToValidate = '';
    validationResult = validationRules.validate(dataToValidate);
    expect(validationResult).toBe(true);

    dataToValidate = 'die';
    validationResult = validationRules.validate(dataToValidate);
    expect(validationResult).toBe(false);
  });
});

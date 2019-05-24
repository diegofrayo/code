import TypesValidator from './types-validator';
import { ValidationError } from './validation-error';

const Validator = (value, isValid, errors, opts) => {
  return {
    array: () => {
      const validationResult = isValid && TypesValidator.isArray(value);

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'array',
            'Current value is not array',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    boolean: () => {
      const validationResult = isValid && TypesValidator.isBoolean(value);

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'boolean',
            'Current value is not boolean',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    number: () => {
      const validationResult = isValid && TypesValidator.isNumber(value);

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'number',
            'Current value is not number',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    string: () => {
      const validationResult = isValid && TypesValidator.isString(value);

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'string',
            'Current value is not string',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    customValidation: customValidationCallback => {
      const callbackResult = customValidationCallback(value);
      const validationResult = isValid && callbackResult.isValid;

      if (!validationResult) {
        errors.push(callbackResult.error);
      }

      return Validator(value, validationResult, errors, opts);
    },

    email: () => {
      const validationResult = isValid && TypesValidator.isEmail(value);

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'email',
            'Current value is not a valid email',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    date: (pattern = 'yyyy-mm-dd') => {
      const validationResult = isValid && TypesValidator.isDate(value, pattern);

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'date',
            'Current value is not a valid date',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    regex: regex => {
      const regexResult = regex.exec(value);
      const validationResult =
        isValid && regexResult !== null && regexResult[0] === regexResult.input;

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'regex',
            'Current value does not match with given regex',
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    min: min => {
      const validationResult = isValid && value >= min;

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'min',
            `Current value must be greater or equal to ${min}`,
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    max: max => {
      const validationResult = isValid && value <= max;

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'max',
            `Current value must be inferior or equal to ${max}`,
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    minLength: length => {
      const validationResult = isValid && value.length >= length;

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'minLength',
            `Current value must have at least ${length} characters, but it has just ${
              value.length
            }`,
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    maxLength: length => {
      const validationResult = isValid && value.length <= length;

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'maxLength',
            `Current value must have ${length} or less characters, but it has ${
              value.length
            }`,
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    allowEmpty: () => {
      const validationResult = (isValid === false && value === '') || isValid === true;

      if (!validationResult) {
        errors.push(
          new ValidationError('allowEmpty', '', value, opts.validatedPropertyName),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    notAllowEmpty: () => {
      const validationResult = isValid && TypesValidator.isString(value) && value !== '';

      if (!validationResult) {
        errors.push(
          new ValidationError(
            'notAllowEmpty',
            "Current value can't be empty",
            value,
            opts.validatedPropertyName,
          ),
        );
      }

      return Validator(value, validationResult, errors, opts);
    },

    exec: () => {
      const result = opts.getErrors ? { isValid, errors } : isValid;

      if (opts.async) {
        return Promise.resolve(result);
      }

      return result;
    },
  };
};

const validate = (
  value,
  { getErrors = false, async = false, validatedPropertyName } = {},
) => {
  return Validator(value, true, [], { getErrors, async, validatedPropertyName });
};

export default validate;

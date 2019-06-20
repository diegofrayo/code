import ValidationError from './validation-error';

const isEmail = email => {
  // eslint-disable-next-line prefer-named-capture-group
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isDate = (date, pattern) => {
  let regex;

  if (pattern === 'dd-mm-yyyy') {
    // eslint-disable-next-line prefer-named-capture-group
    regex = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
  } else {
    // pattern: yyyy-mm-dd
    // eslint-disable-next-line prefer-named-capture-group
    regex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
  }

  return regex.test(date);
};

const TypesValidator = {
  isArray(value) {
    return Array.isArray(value);
  },

  isArrayOf(value, itemsType, opts = { getErrors: false }) {
    if (this.isArray(value)) {
      const validationResult = value.reduce(
        (result, item, index) => {
          if (this.isVLTObjectScheme(itemsType)) {
            const objectSchemeValidationResult = itemsType.validate(item, {
              ...opts,
              getErrors: true,
              validatedPropertyName: `${opts.validatedPropertyName || ''} => ${
                opts.objectKeyExtractor ? opts.objectKeyExtractor(item, index) : ''
              }`,
            });

            if (!objectSchemeValidationResult.isValid) {
              // eslint-disable-next-line no-param-reassign
              result.isValid = false;

              // eslint-disable-next-line no-param-reassign
              result.errors = result.errors.concat(objectSchemeValidationResult.errors);
            }
          } else if (typeof item !== itemsType) {
            // eslint-disable-next-line no-param-reassign
            result.isValid = false;

            // eslint-disable-next-line-d
            result.errors.push(
              new ValidationError(
                'arrayOf',
                `Invalid item to validate, expected: ${itemsType} | given: ${typeof item}`,
                item,
                `Item position: ${index}`,
              ),
            );
          }

          return result;
        },
        { isValid: value.length > 0, errors: [] },
      );

      if (opts.getErrors) {
        return validationResult;
      }

      return validationResult.isValid;
    }

    return {
      isValid: false,
      errors: [
        new ValidationError(
          'arrayOf',
          `Invalid array to validate, you are trying to validate a ${typeof objectToValidate}`,
          value,
          opts.validatedPropertyName,
        ),
      ],
    };
  },

  isBoolean(value) {
    return typeof value === 'boolean';
  },

  isFunction(value) {
    return typeof value === 'function';
  },

  isNumber(value) {
    return typeof value === 'number' && Number.isNaN(value) === false;
  },

  isObject(value) {
    return typeof value === 'object' && this.isArray(value) === false;
  },

  isString(value) {
    return typeof value === 'string';
  },

  isVLTObjectScheme(value) {
    return (
      this.isObject(value) &&
      this.isFunction(value.validate) &&
      value.__name === 'VLDTR_scheme'
    );
  },

  isPromise(value) {
    return this.isObject(value) && this.isFunction(value.then);
  },

  isDate,

  isEmail,
};

export default TypesValidator;

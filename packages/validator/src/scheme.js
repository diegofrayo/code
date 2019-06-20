import TypesValidator from './types-validator';
import ValidationError from './validation-error';

const createOpts = (opts, schemeItemName) => {
  return {
    async: false,
    getErrors: opts.getErrors,
    validatedPropertyName: `${opts.validatedPropertyName ||
      'object'} => ${schemeItemName}`,
  };
};

const scheme = function scheme(objectScheme) {
  return {
    __name: 'VLDTR_scheme',
    validate: (objectToValidate, opts = {}) => {
      let validationResult;

      if (!TypesValidator.isObject(objectToValidate)) {
        validationResult = opts.getErrors
          ? {
              isValid: false,
              errors: [
                new ValidationError(
                  'scheme',
                  `Invalid object to validate, you are trying to validate a ${typeof objectToValidate}`,
                  objectToValidate,
                  'scheme',
                ),
              ],
            }
          : false;
      } else {
        validationResult = Object.entries(objectScheme).reduce(
          (result, [schemeItemName, schemeItemRule]) => {
            const schemeItemValidationResult = schemeItemRule.validate(
              objectToValidate[schemeItemName],
              createOpts(opts, schemeItemName),
              !TypesValidator.isVLTObjectScheme(schemeItemRule)
                ? objectToValidate
                : undefined,
            );

            if (opts.getErrors) {
              if (!schemeItemValidationResult.isValid) {
                // eslint-disable-next-line no-param-reassign
                result.isValid = false;

                // eslint-disable-next-line no-param-reassign
                result.errors = result.errors.concat(schemeItemValidationResult.errors);
              }
            } else if (!schemeItemValidationResult) {
              result = false; // eslint-disable-line no-param-reassign
            }

            return result;
          },
          opts.getErrors ? { isValid: true, errors: [] } : true,
        );
      }

      if (opts.async) {
        const resolver =
          opts.asyncInline || validationResult.isValid || validationResult
            ? 'resolve'
            : 'reject';

        return Promise[resolver](validationResult);
      }

      return validationResult;
    },
  };
};

export default scheme;

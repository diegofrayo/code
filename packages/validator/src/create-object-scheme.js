import TypesValidator from './types-validator';
import validate from './validator';
import { ValidationError } from './validation-error';

const createObjectScheme = scheme => {
  return {
    validate: (value, opts = {}) => {
      let validationResult;

      if (!TypesValidator.isObject(value)) {
        validationResult = opts.getErrors
          ? {
              isValid: false,
              errors: [
                new ValidationError(
                  'createObjectScheme',
                  `Invalid object to validate, you are trying to validate a ${typeof value}`,
                  value,
                  'scheme',
                ),
              ],
            }
          : false;
      } else {
        validationResult = Object.entries(scheme).reduce(
          (result, [schemeItemName, schemeItemRule]) => {
            const schemeItemValidationResult = schemeItemRule
              .getRules()
              .reduce((ruleValidationResult, { ruleName, ruleParams }) => {
                const params =
                  ruleName === 'customValidation'
                    ? [ruleParams(value, opts)]
                    : ruleParams;

                return ruleValidationResult[ruleName].apply(null, params);
              }, validate(value[schemeItemName], { async: false, getErrors: opts.getErrors, validatedPropertyName: `${opts.validatedPropertyName || ''} => ${schemeItemName}` }))
              .exec();

            if (opts.getErrors) {
              if (!schemeItemValidationResult.isValid) {
                // eslint-disable-next-line
                result.isValid = false;

                // eslint-disable-next-line
                result.errors = result.errors.concat(schemeItemValidationResult.errors);
              }
            } else if (!schemeItemValidationResult) {
              result = false; // eslint-disable-line
            }

            return result;
          },
          opts.getErrors ? { isValid: true, errors: [] } : true,
        );
      }

      if (opts.async) {
        return Promise.resolve(validationResult);
      }

      return validationResult;
    },
  };
};

export default createObjectScheme;

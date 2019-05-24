import TypesValidator from './types-validator';

const ValidationError = function ValidationError(
  ruleName,
  message,
  value,
  validatedPropertyName,
) {
  this.name = validatedPropertyName;
  this.ruleName = ruleName;
  this.message = message || 'Wrong value';
  this.value = value;
};

const formatErrorMessage = (validatedPropertyName, errors) => {
  return `
    ${validatedPropertyName} is not valid.

    Errors:
    ${errors
      .map(error => {
        return `
        ${error.name}
          message: ${error.message}
          value: ${
            TypesValidator.isObject(error.value)
              ? JSON.stringify(error.value)
              : error.value
          }
      `;
      })
      .join('')}
  `;
};

export { ValidationError, formatErrorMessage };

import TypesValidator from './types-validator';

const formatErrorMessage = (validatedPropertyName, errors) => {
  return `
    ${validatedPropertyName} is not valid.

    Errors: ${errors
      .map(error => {
        return `
      ${error.name}
        message: ${error.message}
        value: ${
          TypesValidator.isObject(error.value) ? JSON.stringify(error.value) : error.value
        }
      `;
      })
      .join('')}
  `;
};

// eslint-disable-next-line import/prefer-default-export
export { formatErrorMessage };

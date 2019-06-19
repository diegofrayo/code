import TypesValidator from './types-validator';
import ValidationError from './validation-error';

class Validator {
  constructor(value, opts) {
    this.value = value;
    this.opts = opts;
    this.isValid = true;
    this.errors = [];
  }

  _addError = (ruleName, message) => {
    if (this.opts.getErrors) {
      this.errors.push(
        new ValidationError(
          ruleName,
          message,
          this.value,
          this.opts.validatedPropertyName,
        ),
      );
    }
  };

  array = () => {
    this.isValid = this.isValid && TypesValidator.isArray(this.value);

    if (!this.isValid) {
      this._addError('array', 'Current value is not array');
    }

    return this;
  };

  arrayOf = itemsType => {
    const validationResult = TypesValidator.isArrayOf(this.value, itemsType, this.opts);
    this.isValid = this.isValid && validationResult.isValid;

    if (!this.isValid) {
      this._addError('arrayOf', 'The items of the given array are not valid');
      this.errors = this.errors.concat(validationResult.errors);
    }

    return this;
  };

  boolean = () => {
    this.isValid = this.isValid && TypesValidator.isBoolean(this.value);

    if (!this.isValid) {
      this._addError('boolean', 'Current value is not boolean');
    }

    return this;
  };

  number = () => {
    this.isValid = this.isValid && TypesValidator.isNumber(this.value);

    if (!this.isValid) {
      this._addError('number', 'Current value is not number');
    }

    return this;
  };

  string = () => {
    this.isValid = this.isValid && TypesValidator.isString(this.value);

    if (!this.isValid) {
      this._addError('string', 'Current value is not string');
    }

    return this;
  };

  customValidation = customValidationCallback => {
    const callbackResult = customValidationCallback(this.value);
    this.isValid = this.isValid && callbackResult.isValid;

    if (!this.isValid) {
      this.errors.push(callbackResult.error);
    }

    return this;
  };

  email = () => {
    this.isValid = this.isValid && TypesValidator.isEmail(this.value);

    if (!this.isValid) {
      this._addError('email', 'Current value is not a valid email');
    }

    return this;
  };

  date = (pattern = 'yyyy-mm-dd') => {
    this.isValid = this.isValid && TypesValidator.isDate(this.value, pattern);

    if (!this.isValid) {
      this._addError('date', 'Current value is not a valid date');
    }

    return this;
  };

  regex = regex => {
    const regexResult = regex.test(this.value);

    this.isValid =
      this.isValid && regexResult !== null && regexResult[0] === regexResult.input;

    if (!this.isValid) {
      this._addError('regex', 'Current value does not match with given regex');
    }

    return this;
  };

  min = min => {
    this.isValid = this.isValid && this.value >= min;

    if (!this.isValid) {
      this._addError('min', `Current value must be greater or equal to ${min}`);
    }

    return this;
  };

  max = max => {
    this.isValid = this.isValid && this.value <= max;

    if (!this.isValid) {
      this._addError('max', `Current value must be inferior or equal to ${max}`);
    }

    return this;
  };

  minLength = length => {
    this.isValid =
      this.isValid &&
      (TypesValidator.isString(this.value) || TypesValidator.isArray(this.value)) &&
      this.value.length >= length;

    if (!this.isValid) {
      this._addError(
        'minLength',
        `Current value must have at least ${length} characters`,
      );
    }

    return this;
  };

  maxLength = length => {
    this.isValid =
      this.isValid &&
      (TypesValidator.isString(this.value) || TypesValidator.isArray(this.value)) &&
      this.value.length <= length;

    if (!this.isValid) {
      this._addError('maxLength', `Current value must have ${length} or less characters`);
    }

    return this;
  };

  allowEmpty = () => {
    this.isValid = (this.isValid === false && this.value === '') || this.isValid === true;

    if (!this.isValid) {
      this._addError('allowEmpty', '');
    }

    return this;
  };

  notAllowEmpty = () => {
    this.isValid =
      this.isValid && TypesValidator.isString(this.value) && this.value !== '';

    if (!this.isValid) {
      this._addError('notAllowEmpty', "Current value can't be empty");
    }

    return this;
  };

  validate = () => {
    const result = this.opts.getErrors
      ? { isValid: this.isValid, errors: this.errors }
      : this.isValid;

    if (this.opts.async) {
      const resolver = this.opts.asyncInline || this.isValid ? 'resolve' : 'reject';

      return Promise[resolver](result);
    }

    return result;
  };
}

const validate = function validate(
  value,
  opts = {
    getErrors: false,
    async: false,
    validatedPropertyName: '',
    asyncInline: false,
  },
) {
  return new Validator(value, opts);
};

export default validate;

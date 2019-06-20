import scheme from './scheme';
import validate from './validate';
import { formatErrorMessage } from './utils';

class ValidationStructure {
  constructor() {
    this.rules = [];
  }

  array = () => {
    this.rules.push({ ruleName: 'array' });
    return this;
  };

  arrayOf = (...params) => {
    this.rules.push({ ruleName: 'arrayOf', ruleParams: params });
    return this;
  };

  boolean = () => {
    this.rules.push({ ruleName: 'boolean' });
    return this;
  };

  number = () => {
    this.rules.push({ ruleName: 'number' });
    return this;
  };

  string = () => {
    this.rules.push({ ruleName: 'string' });
    return this;
  };

  customValidation = customValidation => {
    this.rules.push({ ruleName: 'customValidation', ruleParams: customValidation });
    return this;
  };

  email = (...params) => {
    this.rules.push({ ruleName: 'email', ruleParams: params });
    return this;
  };

  date = (...params) => {
    this.rules.push({ ruleName: 'date', ruleParams: params });
    return this;
  };

  regex = (...params) => {
    this.rules.push({ ruleName: 'regex', ruleParams: params });
    return this;
  };

  min = (...params) => {
    this.rules.push({ ruleName: 'min', ruleParams: params });
    return this;
  };

  max = (...params) => {
    this.rules.push({ ruleName: 'max', ruleParams: params });
    return this;
  };

  minLength = (...params) => {
    this.rules.push({ ruleName: 'minLength', ruleParams: params });
    return this;
  };

  maxLength = (...params) => {
    this.rules.push({ ruleName: 'maxLength', ruleParams: params });
    return this;
  };

  allowEmpty = () => {
    this.rules.push({ ruleName: 'allowEmpty' });
    return this;
  };

  notAllowEmpty = () => {
    this.rules.push({ ruleName: 'notAllowEmpty' });
    return this;
  };

  getRules = () => {
    this.rules.forEach((rule, index) => {
      const { ruleName } = rule;
      if (ruleName === 'allowEmpty' || ruleName === 'notAllowEmpty') {
        this.rules.splice(index, 1);
        this.rules.push(rule);
      }
    });

    return this.rules;
  };

  validate = (value, opts, objectValue) => {
    return this.getRules()
      .reduce((ruleValidationResult, { ruleName, ruleParams }) => {
        const params =
          ruleName === 'customValidation'
            ? [ruleParams(objectValue || value, opts)]
            : ruleParams;

        return ruleValidationResult[ruleName].apply(null, params);
      }, validate(value, opts))
      .validate();
  };
}

const vlt = function vlt() {
  return new ValidationStructure();
};

vlt.scheme = scheme;
vlt.formatErrorMessage = formatErrorMessage;

export default vlt;

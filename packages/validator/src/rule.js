const ruleCreator = rules => {
  return {
    array: () => {
      rules.push({ ruleName: 'array' });
      return ruleCreator(rules);
    },

    boolean: () => {
      rules.push({ ruleName: 'boolean' });
      return ruleCreator(rules);
    },

    number: () => {
      rules.push({ ruleName: 'number' });
      return ruleCreator(rules);
    },

    string: () => {
      rules.push({ ruleName: 'string' });
      return ruleCreator(rules);
    },

    customValidation: customValidation => {
      rules.push({ ruleName: 'customValidation', ruleParams: customValidation });
      return ruleCreator(rules);
    },

    email: (...params) => {
      rules.push({ ruleName: 'email', ruleParams: params });
      return ruleCreator(rules);
    },

    date: (...params) => {
      rules.push({ ruleName: 'date', ruleParams: params });
      return ruleCreator(rules);
    },

    regex: (...params) => {
      rules.push({ ruleName: 'regex', ruleParams: params });
      return ruleCreator(rules);
    },

    min: (...params) => {
      rules.push({ ruleName: 'min', ruleParams: params });
      return ruleCreator(rules);
    },

    max: (...params) => {
      rules.push({ ruleName: 'max', ruleParams: params });
      return ruleCreator(rules);
    },

    minLength: (...params) => {
      rules.push({ ruleName: 'minLength', ruleParams: params });
      return ruleCreator(rules);
    },

    maxLength: (...params) => {
      rules.push({ ruleName: 'maxLength', ruleParams: params });
      return ruleCreator(rules);
    },

    allowEmpty: () => {
      rules.push({ ruleName: 'allowEmpty' });
      return ruleCreator(rules);
    },

    notAllowEmpty: () => {
      rules.push({ ruleName: 'notAllowEmpty' });
      return ruleCreator(rules);
    },

    getRules: () => {
      return rules;
    },
  };
};

const Rule = () => {
  return ruleCreator([]);
};

export default Rule;

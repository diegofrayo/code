const isEmail = email => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isDate = (date, pattern) => {
  let regex;

  if (pattern === 'dd-mm-yyyy') {
    // eslint-disable-next-line
    regex = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
  } else {
    // eslint-disable-next-line
    regex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
  }

  return regex.test(date);
};

const Validator = (value, isValid) => {
  return {
    array: () => {
      const validationResult = isValid && Array.isArray(value);
      return Validator(value, validationResult);
    },
    string: () => {
      const validationResult = isValid && typeof value === 'string';
      return Validator(value, validationResult);
    },
    bool: () => {
      const validationResult = isValid && typeof value === 'boolean';
      return Validator(value, validationResult);
    },
    number: () => {
      const validationResult =
        isValid && typeof value === 'number' && Number.isNaN(value) === false;
      return Validator(value, validationResult);
    },

    email: () => {
      const validationResult = isValid && isEmail(value);
      return Validator(value, validationResult);
    },
    date: (pattern = 'yyyy-mm-dd') => {
      const validationResult = isValid && isDate(value, pattern);
      return Validator(value, validationResult);
    },
    min: min => {
      const validationResult = isValid && value >= min;
      return Validator(value, validationResult);
    },
    max: max => {
      const validationResult = isValid && value <= max;
      return Validator(value, validationResult);
    },
    minLength: length => {
      const validationResult = isValid && value.length >= length;
      return Validator(value, validationResult);
    },
    allowEmpty: () => {
      const validationResult = (isValid === false && value === '') || isValid === true;
      return Validator(value, validationResult);
    },
    notAllowEmpty: () => {
      const validationResult = isValid && value !== '';
      return Validator(value, validationResult);
    },
    regex: regex => {
      const regexResult = regex.exec(value);
      const validationResult =
        isValid && regexResult !== null && regexResult[0] === regexResult.input;
      return Validator(value, validationResult);
    },

    exec: () => {
      return isValid;
    },
  };
};

const validate = value => {
  return Validator(value, true);
};

const createScheme = struct => {
  return {
    validate: value => {
      let validationResult = typeof value === 'object';

      if (!validationResult) return validationResult;

      Object.entries(struct).forEach(([structItem, structConfig]) => {
        const validator = Object.entries(structConfig).reduce(
          (acum, [ruleKey, ruleConfig]) => {
            return acum[ruleKey](ruleConfig);
          },
          validate(value[structItem]),
        );

        validationResult = validationResult && validator.exec();
      });

      return validationResult;
    },
  };
};

export { createScheme, validate };

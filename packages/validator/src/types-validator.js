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

const TypesValidator = {
  isArray(value) {
    return Array.isArray(value);
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

  isDate,

  isEmail,
};

export default TypesValidator;

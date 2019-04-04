(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['@diegofrayo/validator'] = {})));
}(this, (function (exports) {
  var isEmail = function (email) {
    // eslint-disable-next-line
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  var isDate = function (date, pattern) {
    var regex;

    if (pattern === 'dd-mm-yyyy') {
      // eslint-disable-next-line
      regex = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
    } else {
      // eslint-disable-next-line
      regex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
    }

    return regex.test(date);
  };

  var Validator = function (value, isValid) {
    return {
      array: function () {
        var validationResult = isValid && Array.isArray(value);
        return Validator(value, validationResult);
      },
      string: function () {
        var validationResult = isValid && typeof value === 'string';
        return Validator(value, validationResult);
      },
      bool: function () {
        var validationResult = isValid && typeof value === 'boolean';
        return Validator(value, validationResult);
      },
      number: function () {
        var validationResult = isValid && typeof value === 'number' && Number.isNaN(value) === false;
        return Validator(value, validationResult);
      },
      email: function () {
        var validationResult = isValid && isEmail(value);
        return Validator(value, validationResult);
      },
      date: function (pattern) {
        if ( pattern === void 0 ) pattern = 'yyyy-mm-dd';

        var validationResult = isValid && isDate(value, pattern);
        return Validator(value, validationResult);
      },
      min: function (min) {
        var validationResult = isValid && value >= min;
        return Validator(value, validationResult);
      },
      max: function (max) {
        var validationResult = isValid && value <= max;
        return Validator(value, validationResult);
      },
      minLength: function (length) {
        var validationResult = isValid && value.length >= length;
        return Validator(value, validationResult);
      },
      allowEmpty: function () {
        var validationResult = isValid === false && value === '' || isValid === true;
        return Validator(value, validationResult);
      },
      notAllowEmpty: function () {
        var validationResult = isValid && value !== '';
        return Validator(value, validationResult);
      },
      regex: function (regex) {
        var regexResult = regex.exec(value);
        var validationResult = isValid && regexResult !== null && regexResult[0] === regexResult.input;
        return Validator(value, validationResult);
      },
      exec: function () {
        return isValid;
      }
    };
  };

  var Validate = function (value) {
    return Validator(value, true);
  };

  var createScheme = function (struct) {
    return {
      validate: function (value) {
        var validationResult = typeof value === 'object';
        if (!validationResult) { return validationResult; }
        Object.entries(struct).forEach(function (ref) {
          var structItem = ref[0];
          var structConfig = ref[1];

          var validator = Object.entries(structConfig).reduce(function (acum, ref) {
            var ruleKey = ref[0];
            var ruleConfig = ref[1];

            return acum[ruleKey](ruleConfig);
          }, Validate(value[structItem]));
          validationResult = validationResult && validator.exec();
        });
        return validationResult;
      }
    };
  };

  exports.createScheme = createScheme;
  exports.default = Validate;

})));
//# sourceMappingURL=validator.umd.js.map

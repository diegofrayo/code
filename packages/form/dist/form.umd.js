(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global['@diegofrayo/form'] = factory(global.react,global.PropTypes));
}(this, (function (React,PropTypes) {
  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  var Form = /*@__PURE__*/(function (superclass) {
    function Form() {
      var this$1 = this;
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      superclass.apply(this, args);
      this.state = {
        errors: {},
        status: Form.STATUS.INVALID,
        submitResponse: Object.assign({}, Form.SUBMIT_RESPONSE_INITIAL_STATE),
        values: undefined
      };
      this.inputsState = {};

      this.createDefaultValue = function (type) {
        if (type === 'number') {
          return 1;
        }

        if (type === 'bool') {
          return false;
        }

        return '';
      };

      this.createDefaultValues = function () {
        var ref = this$1.props;
        var defaultValues = ref.defaultValues;
        var config = ref.config;
        var values = Object.assign({}, Object.entries(config).reduce(function (acum, ref) {
            var inputName = ref[0];
            var inputConfig = ref[1];

            if (inputConfig.defaultValue !== undefined) {
              // eslint-disable-next-line
              acum[inputName] = inputConfig.defaultValue;
            } else {
              // eslint-disable-next-line
              acum[inputName] = this$1.createDefaultValue(inputConfig.type);
            }

            return acum;
          }, {}),
          defaultValues);
        return values;
      };

      this.getHandler = function (inputConfig, handlerName) { return function (inputValue, values) {
        if (inputConfig.handlers && typeof inputConfig.handlers[handlerName] === 'function') {
          return inputConfig.handlers[handlerName](inputValue, values);
        }

        if (inputConfig.required === true && inputConfig.customValidation !== true && handlerName === 'isValid') {
          throw new Error('You must set isValid handler');
        }

        if (handlerName === 'isValid') { return true; }
        return inputValue;
      }; };

      this.getSubmitResponseMessages = function (submitResponseMessage, data) {
        if (typeof submitResponseMessage === 'function') {
          return submitResponseMessage(data);
        }

        return submitResponseMessage || '';
      };

      this.initializeInputsState = function (values) {
        var ref = this$1.props;
        var config = ref.config;
        return Object.entries(config).reduce(function (acum, ref) {
          var key = ref[0];
          var value = ref[1];

          if (value.required) {
            if (!values[key]) {
              acum.inputsState[key] = false; // eslint-disable-line

              acum.status = Form.STATUS.INVALID; // eslint-disable-line
            } else {
              acum.inputsState[key] = true; // eslint-disable-line
            }
          }

          return acum;
        }, {
          inputsState: {},
          status: Form.STATUS.VALID
        });
      };

      this.resetSubmitResponse = function () {
        this$1.setState({
          submitResponse: Object.assign({}, Form.SUBMIT_RESPONSE_INITIAL_STATE)
        });
      };

      this.updateErrors = function (ref) {
        var op = ref.op;
        var inputName = ref.inputName;
        var inputConfig = ref.inputConfig;
        var errorMessage = ref.errorMessage;

        return function (prevState) {
          var newState = {
            status: prevState.status,
            errors: Object.assign({}, prevState.errors)
          };

          if (op === 'add') {
            this$1.inputsState[inputName] = false;
            newState.errors[inputName] = errorMessage || inputConfig.errorMessage;
            newState.status = Form.STATUS.INVALID;
          } else {
            this$1.inputsState[inputName] = true;
            delete newState.errors[inputName];
            newState.status = Object.values(this$1.inputsState).reduce(function (acum, prev) {
              if (!prev) { acum += 1; } // eslint-disable-line

              return acum;
            }, 0) > 0 ? Form.STATUS.INVALID : Form.STATUS.VALID;
          }

          return newState;
        };
      };

      this.updateErrorMessage = function (inputName, errorMessage) {
        this$1.setState(this$1.updateErrors({
          op: !errorMessage ? 'remove' : 'add',
          inputName: inputName,
          inputConfig: this$1.props.config[inputName],
          errorMessage: errorMessage
        }));
      };

      this.updateInputValue = function (inputName, value) {
        this$1.setState(function (prevState) {
          var obj;

          var values = Object.assign({}, prevState.values,
            ( obj = {}, obj[inputName] = this$1.getHandler(this$1.props.config[inputName], 'transformBeforeSave')(value), obj ));
          return {
            values: values
          };
        });
      };

      this.updateStatus = function (status) {
        this$1.setState({
          status: status
        });
      };

      this.updaters = {
        updateErrorMessage: this.updateErrorMessage,
        updateInputValue: this.updateInputValue,
        updateStatus: this.updateStatus
      };

      this.validateForm = function (values, errors) {
        return Object.entries(this$1.props.config).reduce(function (acum, ref) {
          var inputName = ref[0];
          var inputConfig = ref[1];

          var isValid = this$1.validateInput({
            inputConfig: inputConfig,
            inputName: inputName,
            values: values,
            updateState: false
          });

          if (isValid) {
            delete acum.errors[inputName]; // eslint-disable-line
          } else {
            acum.status = Form.STATUS.INVALID; // eslint-disable-line

            acum.errors[inputName] = inputConfig.errorMessage; // eslint-disable-line
          }

          return acum;
        }, {
          status: Form.STATUS.VALID,
          errors: errors
        });
      };

      this.validateInput = function (ref) {
        var inputName = ref.inputName;
        var inputConfig = ref.inputConfig;
        var values = ref.values;
        var updateState = ref.updateState;

        var isValid = this$1.getHandler(inputConfig, 'isValid')(values[inputName], values);
        isValid = !(inputConfig.required === true && isValid === false);

        if (updateState) {
          this$1.setState(this$1.updateErrors({
            op: isValid ? 'remove' : 'add',
            inputName: inputName,
            inputConfig: inputConfig
          }));
        }

        return isValid;
      };

      this.onInputChange = function (data) {
        var ref = data.currentTarget ? data.currentTarget : data;
        var name = ref.name;
        var value = ref.value;
        var ref$1 = this$1.props;
        var config = ref$1.config;
        this$1.setState(function (prevState) {
          var obj;

          var values = Object.assign({}, prevState.values,
            ( obj = {}, obj[name] = this$1.getHandler(config[name], 'transformBeforeSave')(value), obj ));
          return {
            values: values
          };
        }, function () {
          this$1.validateInput({
            inputConfig: config[name],
            inputName: name,
            updateState: true,
            values: this$1.state.values
          });
        });
      };

      this.onSubmit = function (event) {
        event.preventDefault();
        var ref = this$1.props;
        var config = ref.config;
        var submitResponseMessages = ref.submitResponseMessages;
        var onSubmit = ref.onSubmit;
        var ref$1 = this$1.state;
        var status = ref$1.status;
        var values = ref$1.values;
        if (status === Form.STATUS.INVALID) { return null; }
        var transformedValues = Object.entries(config).reduce(function (acum, ref) {
          var inputName = ref[0];
          var inputConfig = ref[1];

          // eslint-disable-next-line
          acum[inputName] = this$1.getHandler(inputConfig, 'transformBeforeSubmit')(values[inputName]);
          return acum;
        }, {});
        this$1.setState({
          status: Form.STATUS.LOADING,
          submitResponse: Object.assign({}, Form.SUBMIT_RESPONSE_INITIAL_STATE)
        });
        return onSubmit(transformedValues).then(function (res) {
          this$1.setState({
            status: Form.STATUS.VALID,
            submitResponse: {
              type: Form.SUBMIT_RESPONSE_TYPES.SUCCESS,
              message: this$1.getSubmitResponseMessages(submitResponseMessages.success, res),
              show: true
            }
          });
        }).catch(function (e) {
          this$1.setState({
            status: Form.STATUS.VALID,
            submitResponse: {
              type: Form.SUBMIT_RESPONSE_TYPES.FAILURE,
              message: this$1.getSubmitResponseMessages(submitResponseMessages.failure, e),
              show: true
            }
          });
        });
      };
    }

    if ( superclass ) Form.__proto__ = superclass;
    Form.prototype = Object.create( superclass && superclass.prototype );
    Form.prototype.constructor = Form;

    Form.prototype.componentDidMount = function componentDidMount () {
      var this$1 = this;

      var values = this.createDefaultValues();

      if (this.props.validateAtDidMount) {
        this.setState(function (prevState) {
          return Object.assign({}, {values: values},
            this$1.validateForm(values, Object.assign({}, prevState.errors)));
        });
      } else {
        this.setState(Object.assign({}, {values: values},
          this.initializeInputsState(values)));
      }
    };

    Form.prototype.render = function render () {
      var ref = this.props;
      var children = ref.children;
      var ref$1 = this.state;
      var errors = ref$1.errors;
      var submitResponse = ref$1.submitResponse;
      var status = ref$1.status;
      var values = ref$1.values;
      var ref$2 = this;
      var resetSubmitResponse = ref$2.resetSubmitResponse;
      var updaters = ref$2.updaters;
      var onInputChange = ref$2.onInputChange;
      var onSubmit = ref$2.onSubmit;
      if (!values) { return null; }
      return React.createElement( 'form', null,
          children({
          errors: errors,
          onInputChange: onInputChange,
          onSubmit: onSubmit,
          resetSubmitResponse: resetSubmitResponse,
          status: status,
          submitResponse: submitResponse,
          updaters: updaters,
          values: values
        })
        );
    };

    return Form;
  }(React.Component));

  Form.STATUS = {
    VALID: 1,
    INVALID: 2,
    LOADING: 3
  };
  Form.SUBMIT_RESPONSE_TYPES = {
    SUCCESS: 0,
    FAILURE: 1
  };
  Form.SUBMIT_RESPONSE_INITIAL_STATE = {
    type: Form.SUBMIT_RESPONSE_TYPES.SUCCESS,
    message: '',
    show: false
  };
  Form.propTypes = {
    // See docs: https://diegofrayo-docs.netlify.com
    config: PropTypes.object.isRequired,
    // eslint-disable-line
    children: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    defaultValues: PropTypes.object,
    // eslint-disable-line
    submitResponseMessages: PropTypes.shape({
      success: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      failure: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }),
    validateAtDidMount: PropTypes.bool
  };
  Form.defaultProps = {
    defaultValues: {},
    submitResponseMessages: {},
    validateAtDidMount: false
  };

  return Form;

})));
//# sourceMappingURL=form.umd.js.map

import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  static STATUS = {
    VALID: 1,
    INVALID: 2,
    LOADING: 3,
  };

  static SUBMIT_RESPONSE_TYPES = {
    SUCCESS: 0,
    FAILURE: 1,
  };

  static SUBMIT_RESPONSE_INITIAL_STATE = {
    type: Form.SUBMIT_RESPONSE_TYPES.SUCCESS,
    message: '',
    show: false,
  };

  static propTypes = {
    // See docs: https://diegofrayo-docs.netlify.com
    config: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,

    defaultValues: PropTypes.object,
    submitResponseMessages: PropTypes.shape({
      success: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      failure: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }),
    validateAtDidMount: PropTypes.bool,
  };

  static defaultProps = {
    defaultValues: {},
    submitResponseMessages: {},
    validateAtDidMount: false,
  };

  state = {
    errors: {},
    status: Form.STATUS.INVALID,
    submitResponse: { ...Form.SUBMIT_RESPONSE_INITIAL_STATE },
    values: undefined,
  };

  inputsState = {};

  componentDidMount() {
    const values = this.createDefaultValues();

    if (this.props.validateAtDidMount) {
      this.setState(prevState => {
        return { values, ...this.validateForm(values, { ...prevState.errors }) };
      });
    } else {
      this.setState({ values, ...this.initializeInputsState(values) });
    }
  }

  createDefaultValue = type => {
    if (type === 'number') {
      return 1;
    }

    if (type === 'bool') {
      return false;
    }

    return '';
  };

  createDefaultValues = () => {
    const { defaultValues, config } = this.props;

    const values = {
      ...Object.entries(config).reduce((acum, [inputName, inputConfig]) => {
        if (inputConfig.defaultValue !== undefined) {
          // eslint-disable-next-line
          acum[inputName] = inputConfig.defaultValue;
        } else {
          // eslint-disable-next-line
          acum[inputName] = this.createDefaultValue(inputConfig.type);
        }

        return acum;
      }, {}),
      ...defaultValues,
    };

    return values;
  };

  getHandler = (inputConfig, handlerName) => (inputValue, values) => {
    if (inputConfig.handlers && typeof inputConfig.handlers[handlerName] === 'function') {
      return inputConfig.handlers[handlerName](inputValue, values);
    }

    if (
      inputConfig.required === true &&
      inputConfig.customValidation !== true &&
      handlerName === 'isValid'
    ) {
      throw new Error('You must set isValid handler');
    }

    if (handlerName === 'isValid') return true;

    return inputValue;
  };

  getSubmitResponseMessages = (submitResponseMessage, data) => {
    if (typeof submitResponseMessage === 'function') {
      return submitResponseMessage(data);
    }

    return submitResponseMessage || '';
  };

  initializeInputsState = values => {
    const { config } = this.props;

    return Object.entries(config).reduce(
      (acum, [key, value]) => {
        if (value.required) {
          if (!values[key]) {
            acum.inputsState[key] = false; // eslint-disable-line
            acum.status = Form.STATUS.INVALID; // eslint-disable-line
          } else {
            acum.inputsState[key] = true; // eslint-disable-line
          }
        }

        return acum;
      },
      { inputsState: {}, status: Form.STATUS.VALID },
    );
  };

  resetSubmitResponse = () => {
    this.setState({ submitResponse: { ...Form.SUBMIT_RESPONSE_INITIAL_STATE } });
  };

  updateErrors = ({ op, inputName, inputConfig, errorMessage }) => {
    return prevState => {
      const newState = {
        status: prevState.status,
        errors: { ...prevState.errors },
      };

      if (op === 'add') {
        this.inputsState[inputName] = false;
        newState.errors[inputName] = errorMessage || inputConfig.errorMessage;
        newState.status = Form.STATUS.INVALID;
      } else {
        this.inputsState[inputName] = true;
        delete newState.errors[inputName];
        newState.status =
          Object.values(this.inputsState).reduce((acum, prev) => {
            if (!prev) acum += 1; // eslint-disable-line
            return acum;
          }, 0) > 0
            ? Form.STATUS.INVALID
            : Form.STATUS.VALID;
      }

      return newState;
    };
  };

  updateErrorMessage = (inputName, errorMessage) => {
    this.setState(
      this.updateErrors({
        op: !errorMessage ? 'remove' : 'add',
        inputName,
        inputConfig: this.props.config[inputName],
        errorMessage,
      }),
    );
  };

  updateInputValue = (inputName, value) => {
    this.setState(prevState => {
      const values = {
        ...prevState.values,
        [inputName]: this.getHandler(this.props.config[inputName], 'transformBeforeSave')(
          value,
        ),
      };

      return { values };
    });
  };

  updateStatus = status => {
    this.setState({ status });
  };

  // eslint-disable-next-line
  updaters = {
    updateErrorMessage: this.updateErrorMessage,
    updateInputValue: this.updateInputValue,
    updateStatus: this.updateStatus,
  };

  validateForm = (values, errors) => {
    return Object.entries(this.props.config).reduce(
      (acum, [inputName, inputConfig]) => {
        const isValid = this.validateInput({
          inputConfig,
          inputName,
          values,
          updateState: false,
        });

        if (isValid) {
          delete acum.errors[inputName]; // eslint-disable-line
        } else {
          acum.status = Form.STATUS.INVALID; // eslint-disable-line
          acum.errors[inputName] = inputConfig.errorMessage; // eslint-disable-line
        }

        return acum;
      },
      { status: Form.STATUS.VALID, errors },
    );
  };

  validateInput = ({ inputName, inputConfig, values, updateState }) => {
    let isValid = this.getHandler(inputConfig, 'isValid')(values[inputName], values);

    isValid = !(inputConfig.required === true && isValid === false);

    if (updateState) {
      this.setState(
        this.updateErrors({
          op: isValid ? 'remove' : 'add',
          inputName,
          inputConfig,
        }),
      );
    }

    return isValid;
  };

  onInputChange = data => {
    const { name, value } = data.currentTarget ? data.currentTarget : data;
    const { config } = this.props;

    this.setState(
      prevState => {
        const values = {
          ...prevState.values,
          [name]: this.getHandler(config[name], 'transformBeforeSave')(value),
        };

        return { values };
      },
      () => {
        this.validateInput({
          inputConfig: config[name],
          inputName: name,
          updateState: true,
          values: this.state.values,
        });
      },
    );
  };

  onSubmit = event => {
    event.preventDefault();

    const { config, submitResponseMessages, onSubmit } = this.props;
    const { status, values } = this.state;

    if (status === Form.STATUS.INVALID) return null;

    const transformedValues = Object.entries(config).reduce(
      (acum, [inputName, inputConfig]) => {
        // eslint-disable-next-line
        acum[inputName] = this.getHandler(inputConfig, 'transformBeforeSubmit')(
          values[inputName],
        );

        return acum;
      },
      {},
    );

    this.setState({
      status: Form.STATUS.LOADING,
      submitResponse: { ...Form.SUBMIT_RESPONSE_INITIAL_STATE },
    });

    return onSubmit(transformedValues)
      .then(res => {
        this.setState({
          status: Form.STATUS.VALID,
          submitResponse: {
            type: Form.SUBMIT_RESPONSE_TYPES.SUCCESS,
            message: this.getSubmitResponseMessages(submitResponseMessages.success, res),
            show: true,
          },
        });
      })
      .catch(e => {
        this.setState({
          status: Form.STATUS.VALID,
          submitResponse: {
            type: Form.SUBMIT_RESPONSE_TYPES.FAILURE,
            message: this.getSubmitResponseMessages(submitResponseMessages.failure, e),
            show: true,
          },
        });
      });
  };

  render() {
    const { children } = this.props;
    const { errors, submitResponse, status, values } = this.state;
    const { resetSubmitResponse, updaters, onInputChange, onSubmit } = this;

    if (!values) return null;

    return (
      <form>
        {children({
          errors,
          onInputChange,
          onSubmit,
          resetSubmitResponse,
          status,
          submitResponse,
          updaters,
          values,
        })}
      </form>
    );
  }
}

export default Form;

import {
  TypesValidator,
  validate,
  ValidationError,
  Validator,
  ValidatorRule,
} from '@diegofrayo/validator';

import { FORM_STATUS } from './constants';

export default class FormService {
  constructor({ props, state, stateHandlers }) {
    this.props = props;
    this.state = state;
    this.stateHandlers = stateHandlers;
  }

  validateFormConfig = formConfig => {
    const customValidation = (inputConfig, opts) => handlers => {
      if (
        inputConfig.customValidation !== true &&
        (!TypesValidator.isObject(handlers) ||
          !TypesValidator.isFunction(handlers.isValid))
      ) {
        return {
          isValid: false,
          error: new ValidationError(
            'customValidation',
            'You must set isValid handler',
            handlers,
            `${opts.validatedPropertyName} => handlers`,
          ),
        };
      }

      return { isValid: true };
    };

    const formConfigValidation = validate(formConfig, {
      getErrors: true,
      validatedPropertyName: 'formConfig',
      objectKeyExtractor: (object, index) => Object.keys(formConfig)[index],
    }).arrayOf(
      Validator.createObjectScheme({
        type: new ValidatorRule().string().notAllowEmpty(),
        errorMessage: new ValidatorRule().string().notAllowEmpty(),
        handlers: new ValidatorRule().customValidation(customValidation),
      }),
    );

    if (!formConfigValidation.isValid) {
      throw new Error(
        Validator.formatErrorMessage('formConfig', formConfigValidation.errors),
      );
    }

    return true;
  };

  createFormDefaultValues = (formDefaultValues, formConfig) => {
    const formValues = {
      ...Object.entries(formConfig).reduce((result, [inputName, inputConfig]) => {
        if (inputConfig.defaultValue !== undefined) {
          // eslint-disable-next-line
          result[inputName] = inputConfig.defaultValue;
        } else {
          // eslint-disable-next-line
          result[inputName] = this._createInputDefaultValue(inputConfig.type);
        }

        return result;
      }, {}),
      ...formDefaultValues,
    };

    return formValues;
  };

  getFormInvalidInputs = formConfig => {
    const results = {
      ...Object.entries(formConfig).reduce(
        (result, [inputName, inputConfig]) => {
          if (inputConfig.customValidation === true) {
            // eslint-disable-next-line
            result.formInvalidInputs[inputName] = true;

            // eslint-disable-next-line
            result.formErrors[inputName] =
              inputConfig.errorMessage || 'Wrong input value';
          }

          return result;
        },
        { formInvalidInputs: {}, formErrors: {} },
      ),
    };

    return results;
  };

  validateForm = ({ formConfig, formValues, formErrors, formInvalidInputs }) => {
    return Object.entries(formConfig).reduce(
      (result, [inputName, inputConfig]) => {
        const isValidInput = this._validateInput({
          inputName,
          inputConfig,
          inputValue: formValues[inputName],
          formValues,
          formInvalidInputs,
        });

        if (isValidInput) {
          delete result.formErrors[inputName]; // eslint-disable-line
        } else {
          // eslint-disable-next-line
          result.formStatus = FORM_STATUS.INVALID;

          // eslint-disable-next-line
          result.formErrors[inputName] =
            result.formErrors[inputName] || inputConfig.errorMessage;
        }

        return result;
      },
      { formStatus: FORM_STATUS.VALID, formErrors: { ...formErrors } },
    );
  };

  onSubmit = event => {
    event.preventDefault();

    const {
      formConfig,
      onSubmitHandler,
      submitResponseMessages,
      validateAtDidMount,
    } = this.props;
    const { formErrors, formInvalidInputs, formValues } = this.state;
    const {
      setFormErrors,
      setLoadingFormStatus,
      setFailureSubmitResponse,
      setSuccessSubmitResponse,
      updateFormStatus,
    } = this.stateHandlers;

    if (!validateAtDidMount && this._onSubmitFiredByFirstTime()) {
      const {
        formErrors: formErrorsResulting,
        formStatus: formStatusResulting,
      } = this.validateForm({
        formConfig,
        formErrors,
        formValues,
        formInvalidInputs,
      });

      if (formStatusResulting === FORM_STATUS.INVALID) {
        setFormErrors(formErrorsResulting);
        updateFormStatus(formStatusResulting);
        return;
      }
    }

    const transformedValues = Object.entries(formConfig).reduce(
      (result, [inputName, inputConfig]) => {
        // eslint-disable-next-line
        result[inputName] = this._executeInputHandler({
          handlerName: 'transformBeforeSubmit',
          inputName,
          inputConfig,
          inputValue: formValues[inputName],
        });

        return result;
      },
      {},
    );

    const onSubmitHandlerResult = onSubmitHandler(transformedValues);

    if (TypesValidator.isPromise(onSubmitHandlerResult)) {
      setLoadingFormStatus();

      onSubmitHandlerResult
        .then(res => {
          setSuccessSubmitResponse(
            this._getSubmitResponseMessage(submitResponseMessages.success, res),
          );
        })
        .catch(e => {
          setFailureSubmitResponse(
            this._getSubmitResponseMessage(submitResponseMessages.failure, e),
          );
        });
    }
  };

  onInputChange = data => {
    const { name: inputName, value: inputValue } = data.currentTarget
      ? data.currentTarget
      : data;

    const { formConfig } = this.props;
    const { formInvalidInputs, formValues } = this.state;
    const { updateErrorMessage, updateFormStatus, updateInputValue } = this.stateHandlers;

    const inputConfig = formConfig[inputName];
    const transformedValue = this._executeInputHandler({
      handlerName: 'transformBeforeSave',
      inputName,
      inputConfig,
      inputValue,
    });

    updateInputValue(inputName, transformedValue);

    const isValidInput = this._validateInput({
      inputConfig,
      inputName,
      inputValue: transformedValue,
      formValues,
      formInvalidInputs,
    });

    this._updateErrorMessage({
      addErrorMessageIf: !isValidInput,
      inputConfig,
      inputName,
      formInvalidInputs,
      updateErrorMessage,
      updateFormStatus,
    });
  };

  updateErrorMessage = ({ inputConfig, inputName, errorMessage }) => {
    const { formInvalidInputs } = this.state;
    const { updateErrorMessage, updateFormStatus } = this.stateHandlers;

    this._updateErrorMessage({
      addErrorMessageIf: typeof errorMessage === 'string',
      errorMessage,
      inputConfig,
      inputName,
      formInvalidInputs,
      updateErrorMessage,
      updateFormStatus,
    });
  };

  _validateInput = ({
    inputConfig,
    inputValue,
    formValues,
    formInvalidInputs,
    inputName,
  }) => {
    const isValidInput = this._executeInputHandler({
      handlerName: 'isValid',
      inputConfig,
      inputValue,
      formValues,
      isInputValid: formInvalidInputs[inputName] === undefined,
    });

    return isValidInput;
  };

  _updateErrorMessage = ({
    addErrorMessageIf: addErrorMessage,
    errorMessage,
    inputConfig,
    inputName,

    formInvalidInputs,

    updateErrorMessage,
    updateFormStatus,
  }) => {
    if (addErrorMessage) {
      this._addErrorMessage({
        errorMessage,
        inputName,
        inputConfig,
        updateErrorMessage,
        updateFormStatus,
      });
    } else {
      this._removeErrorMessage({
        inputName,
        formInvalidInputs,
        updateErrorMessage,
        updateFormStatus,
      });
    }
  };

  _addErrorMessage = ({
    errorMessage,
    inputName,
    inputConfig,
    updateErrorMessage,
    updateFormStatus,
  }) => {
    let finalErrorMessage;

    if (errorMessage === null) {
      finalErrorMessage = '';
    } else if (typeof errorMessage === 'string') {
      finalErrorMessage = errorMessage;
    } else {
      finalErrorMessage = inputConfig.errorMessage;
    }

    updateErrorMessage(inputName, finalErrorMessage);
    updateFormStatus(FORM_STATUS.INVALID);
  };

  _removeErrorMessage = ({
    inputName,
    formInvalidInputs,
    updateErrorMessage,
    updateFormStatus,
  }) => {
    const numberOfInvalidInputs = this._getNumberOfInvalidInputs(
      inputName,
      formInvalidInputs,
    );
    const formStatus =
      numberOfInvalidInputs > 0 ? FORM_STATUS.INVALID : FORM_STATUS.VALID;

    updateErrorMessage(inputName, null);
    updateFormStatus(formStatus);
  };

  _executeInputHandler = ({
    handlerName,
    inputConfig,
    inputValue,
    formValues,
    isInputValid,
  }) => {
    // try to execute the handler if it exists
    if (inputConfig.handlers && typeof inputConfig.handlers[handlerName] === 'function') {
      return inputConfig.handlers[handlerName](inputValue, formValues);
    }

    // if input has its own custom validation
    if (handlerName === 'isValid') {
      return isInputValid;
    }

    // if the handler required is not defined
    return inputValue;
  };

  _createInputDefaultValue = type => {
    if (type === 'number') {
      return 1;
    }

    if (type === 'bool') {
      return false;
    }

    return '';
  };

  _getSubmitResponseMessage = (submitResponseMessage, data) => {
    if (typeof submitResponseMessage === 'function') {
      return submitResponseMessage(data);
    }

    return submitResponseMessage;
  };

  _isInvalidInput = isInvalid => {
    return isInvalid === true;
  };

  _getNumberOfInvalidInputs = (inputName, formInvalidInputs) => {
    let invalidInputs = Object.values(formInvalidInputs).filter(this._isInvalidInput)
      .length;

    if (this._isInvalidInput(formInvalidInputs[inputName])) {
      invalidInputs -= 1;
    }

    return invalidInputs;
  };

  _onSubmitFiredByFirstTime = () => {
    if (this.onSubmitFiredByFirstTime === undefined) {
      this.onSubmitFiredByFirstTime = false;
      return true;
    }

    return false;
  };
}

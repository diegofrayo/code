import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';

const createInputDefaultValue = type => {
  if (type === 'number') {
    return 1;
  }

  if (type === 'bool') {
    return false;
  }

  return '';
};

const executeInputHandler = ({ handlerName, inputConfig, inputValue, formValues }) => {
  if (inputConfig.handlers && typeof inputConfig.handlers[handlerName] === 'function') {
    return inputConfig.handlers[handlerName](inputValue, formValues);
  }

  if (handlerName === 'isValid') {
    if (inputConfig.required === true && inputConfig.customValidation !== true) {
      throw new Error('You must set isValid handler');
    }

    return true;
  }

  return inputValue;
};

const getSubmitResponseMessage = (submitResponseMessage, data) => {
  if (typeof submitResponseMessage === 'function') {
    return submitResponseMessage(data);
  }

  return submitResponseMessage;
};

const addErrorMessage = ({
  inputName,
  inputConfig,
  errorMessage,
  updateErrorMessage,
  updateFormStatus,
  updateInputState,
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

  if (inputConfig.required) {
    updateInputState(inputName, false);
  }
};

const removeErrorMessage = ({
  inputName,
  inputConfig,
  inputsState,
  updateErrorMessage,
  updateFormStatus,
  updateInputState,
}) => {
  updateErrorMessage(inputName);

  if (inputConfig.required) {
    let invalidInputs = Object.values(inputsState).filter(inputState => !inputState)
      .length;
    invalidInputs -= inputsState[inputName] === false ? 1 : 0;
    const status = invalidInputs > 0 ? FORM_STATUS.INVALID : FORM_STATUS.VALID;
    updateFormStatus(status);
    updateInputState(inputName, true);
  }
};

const validateInput = ({ inputName, inputConfig, inputValue, formValues }) => {
  let isValid = executeInputHandler({
    handlerName: 'isValid',
    inputConfig,
    inputValue,
    formValues,
  });

  isValid =
    !(inputConfig.required === true && isValid === false) ||
    (inputConfig.required === false &&
      formValues[inputName] !== undefined &&
      isValid === true);

  return isValid;
};

export const createFormDefaultValues = ({ formDefaultValues, formConfig }) => {
  const values = {
    ...Object.entries(formConfig).reduce((result, [inputName, inputConfig]) => {
      if (inputConfig.defaultValue !== undefined) {
        // eslint-disable-next-line
        result[inputName] = inputConfig.defaultValue;
      } else {
        // eslint-disable-next-line
        result[inputName] = createInputDefaultValue(inputConfig.type);
      }

      return result;
    }, {}),
    ...formDefaultValues,
  };

  return values;
};

export const initializeInputsState = ({ formValues, formConfig }) => {
  return Object.entries(formConfig).reduce(
    (result, [inputName, inputConfig]) => {
      if (inputConfig.required) {
        const isInputValid = executeInputHandler({
          handlerName: 'isValid',
          inputConfig,
          inputValue: formValues[inputName],
          formValues,
        });

        if (isInputValid) {
          result.inputsState[inputName] = true; // eslint-disable-line
        } else {
          result.inputsState[inputName] = false; // eslint-disable-line
          result.formStatus = FORM_STATUS.INVALID; // eslint-disable-line
        }
      }

      return result;
    },
    { inputsState: {}, formStatus: FORM_STATUS.VALID },
  );
};

export const updaterErrorMessage = ({
  inputsState,
  updateErrorMessage,
  updateFormStatus,
  updateInputState,
}) => ({ inputName, inputConfig, errorMessage }) => {
  if (errorMessage) {
    addErrorMessage({
      inputName,
      inputConfig,
      errorMessage,
      updateErrorMessage,
      updateFormStatus,
      updateInputState,
    });
  } else {
    removeErrorMessage({
      inputName,
      inputConfig,
      inputsState,
      updateErrorMessage,
      updateFormStatus,
      updateInputState,
    });
  }
};

export const validateForm = ({ formConfig, formValues, formErrors }) => {
  return Object.entries(formConfig).reduce(
    (result, [inputName, inputConfig]) => {
      const isInputValid = validateInput({
        inputName,
        inputConfig,
        inputValue: formValues[inputName],
        formValues,
      });

      if (isInputValid) {
        delete result.formErrors[inputName]; // eslint-disable-line
      } else {
        result.formStatus = FORM_STATUS.INVALID; // eslint-disable-line
        result.formErrors[inputName] = inputConfig.errorMessage; // eslint-disable-line
      }

      return result;
    },
    { formStatus: FORM_STATUS.VALID, formErrors: { ...formErrors } },
  );
};

export const onInputChange = ({
  inputsState,
  formConfig,
  formValues,
  updateErrorMessage,
  updateFormStatus,
  updateInputState,
  updateInputValue,
}) => data => {
  const { name: inputName, value } = data.currentTarget ? data.currentTarget : data;

  const inputConfig = formConfig[inputName];
  const transformedValue = executeInputHandler({
    handlerName: 'transformBeforeSave',
    inputName,
    inputConfig,
    inputValue: value,
  });

  updateInputValue(inputName, transformedValue);

  const isInputValid = validateInput({
    inputConfig,
    inputName,
    inputValue: transformedValue,
    formValues,
  });

  if (isInputValid) {
    removeErrorMessage({
      inputName,
      inputConfig,
      inputsState,
      updateErrorMessage,
      updateFormStatus,
      updateInputState,
    });
  } else {
    addErrorMessage({
      inputName,
      inputConfig,
      updateErrorMessage,
      updateFormStatus,
      updateInputState,
    });
  }
};

export const onSubmit = ({
  formStatus,
  formConfig,
  formValues,
  resetSubmitResponse,
  updateFormStatus,
  updateSubmitResponse,

  onSubmitCallback,
  submitResponseMessages,
}) => event => {
  event.preventDefault();

  if (formStatus === FORM_STATUS.INVALID) return null;

  const transformedValues = Object.entries(formConfig).reduce(
    (result, [inputName, inputConfig]) => {
      // eslint-disable-next-line
      result[inputName] = executeInputHandler({
        handlerName: 'transformBeforeSubmit',
        inputName,
        inputConfig,
        inputValue: formValues[inputName],
      });

      return result;
    },
    {},
  );

  updateFormStatus(FORM_STATUS.LOADING);
  resetSubmitResponse();

  return onSubmitCallback(transformedValues)
    .then(res => {
      updateFormStatus(FORM_STATUS.VALID);
      updateSubmitResponse({
        type: FORM_SUBMIT_RESPONSE_TYPES.SUCCESS,
        message: getSubmitResponseMessage(submitResponseMessages.success, res),
        show: true,
      });
    })
    .catch(e => {
      updateFormStatus(FORM_STATUS.VALID);
      updateSubmitResponse({
        type: FORM_SUBMIT_RESPONSE_TYPES.FAILURE,
        message: getSubmitResponseMessage(submitResponseMessages.failure, e),
        show: true,
      });
    });
};

import React from 'react';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';

const INITIAL_STATE = {
  formErrors: {},
  formStatus: FORM_STATUS.INVALID,
  formValues: null,
  inputsState: {},
  submitResponse: {
    type: FORM_SUBMIT_RESPONSE_TYPES.SUCCESS,
    message: '',
    show: false,
  },
};

const ACTIONS = {
  RESET_SUBMIT_RESPONSE: 'RESET_SUBMIT_RESPONSE',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
  UPDATE_FORM_ERRORS: 'UPDATE_FORM_ERRORS',
  UPDATE_FORM_STATUS: 'UPDATE_FORM_STATUS',
  UPDATE_FORM_VALUES: 'UPDATE_FORM_VALUES',
  UPDATE_INPUT_STATE: 'UPDATE_INPUT_STATE',
  UPDATE_INPUT_VALUE: 'UPDATE_INPUT_VALUE',
  UPDATE_INPUTS_STATE: 'UPDATE_INPUTS_STATE',
  UPDATE_SUBMIT_RESPONSE: 'UPDATE_SUBMIT_RESPONSE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET_SUBMIT_RESPONSE:
      return { ...state, submitResponse: INITIAL_STATE.submitResponse };

    case ACTIONS.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        formErrors: (formErrors => {
          const formErrorsUpdated = { ...formErrors };

          if (!action.payload.errorMessage) {
            delete formErrorsUpdated[action.payload.inputName];
          } else {
            formErrorsUpdated[action.payload.inputName] = action.payload.errorMessage;
          }

          return formErrorsUpdated;
        })(state.formErrors),
      };

    case ACTIONS.UPDATE_FORM_ERRORS:
      return { ...state, formErrors: action.payload.formErrors };

    case ACTIONS.UPDATE_FORM_STATUS:
      return { ...state, formStatus: action.payload.formStatus };

    case ACTIONS.UPDATE_FORM_VALUES:
      return { ...state, formValues: action.payload.formValues };

    case ACTIONS.UPDATE_INPUT_STATE:
      return {
        ...state,
        inputsState: {
          ...state.inputsState,
          [action.payload.inputName]: action.payload.inputState,
        },
      };

    case ACTIONS.UPDATE_INPUT_VALUE:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.payload.inputName]: action.payload.inputValue,
        },
      };

    case ACTIONS.UPDATE_INPUTS_STATE:
      return { ...state, inputsState: action.payload.inputsState };

    case ACTIONS.UPDATE_SUBMIT_RESPONSE:
      return { ...state, submitResponse: action.payload.submitResponse };

    default:
      throw new Error(`Invalid action: ${action.type}`);
  }
};

const useForm = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const resetSubmitResponse = () => {
    dispatch({ type: ACTIONS.RESET_SUBMIT_RESPONSE });
  };

  const updateErrorMessage = (inputName, errorMessage) => {
    dispatch({
      type: ACTIONS.UPDATE_ERROR_MESSAGE,
      payload: { inputName, errorMessage },
    });
  };

  const updateFormErrors = formErrors => {
    dispatch({ type: ACTIONS.UPDATE_FORM_ERRORS, payload: { formErrors } });
  };

  const updateFormStatus = formStatus => {
    dispatch({ type: ACTIONS.UPDATE_FORM_STATUS, payload: { formStatus } });
  };

  const updateFormValues = formValues => {
    dispatch({ type: ACTIONS.UPDATE_FORM_VALUES, payload: { formValues } });
  };

  const updateInputsState = inputsState => {
    dispatch({ type: ACTIONS.UPDATE_INPUTS_STATE, payload: { inputsState } });
  };

  const updateInputState = (inputName, inputState) => {
    dispatch({ type: ACTIONS.UPDATE_INPUT_STATE, payload: { inputName, inputState } });
  };

  const updateInputValue = (inputName, inputValue) => {
    dispatch({ type: ACTIONS.UPDATE_INPUT_VALUE, payload: { inputName, inputValue } });
  };

  const updateSubmitResponse = submitResponse => {
    dispatch({ type: ACTIONS.UPDATE_SUBMIT_RESPONSE, payload: { submitResponse } });
  };

  return {
    state,

    resetSubmitResponse,
    updateErrorMessage,
    updateFormErrors,
    updateFormStatus,
    updateFormValues,
    updateInputsState,
    updateInputState,
    updateInputValue,
    updateSubmitResponse,
  };
};

export default useForm;

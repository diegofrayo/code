import React from 'react';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';
import { keyMirror } from './utils';

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

const ACTIONS = keyMirror({
  RESET_SUBMIT_RESPONSE: 0,
  SET_LOADING_FORM_STATUS: 0,
  SET_FAILURE_SUBMIT_RESPONSE: 0,
  SET_SUCCESS_SUBMIT_RESPONSE: 0,
  SET_INPUTS_STATE: 0,
  UPDATE_ERROR_MESSAGE: 0,
  UPDATE_FORM_STATUS: 0,
  UPDATE_FORM_VALUES: 0,
  UPDATE_INPUT_STATE: 0,
  UPDATE_INPUT_VALUE: 0,
  UPDATE_STATE_AT_DIDMOUNT: 0,
});

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RESET_SUBMIT_RESPONSE:
      return { ...state, submitResponse: INITIAL_STATE.submitResponse };

    case ACTIONS.SET_LOADING_FORM_STATUS:
      return {
        ...state,
        formStatus: FORM_STATUS.LOADING,
        submitResponse: INITIAL_STATE.submitResponse,
      };

    case ACTIONS.SET_SUCCESS_SUBMIT_RESPONSE:
      return {
        ...state,
        formStatus: FORM_STATUS.VALID,
        submitResponse: {
          show: true,
          type: FORM_SUBMIT_RESPONSE_TYPES.SUCCESS,
          message: action.payload.message,
        },
      };

    case ACTIONS.SET_FAILURE_SUBMIT_RESPONSE:
      return {
        ...state,
        formStatus: FORM_STATUS.VALID,
        submitResponse: {
          show: true,
          type: FORM_SUBMIT_RESPONSE_TYPES.FAILURE,
          message: action.payload.message,
        },
      };

    case ACTIONS.SET_INPUTS_STATE:
      return {
        ...state,
        formStatus: action.payload.formStatus,
        inputsState: action.payload.inputsState,
      };

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

    case ACTIONS.UPDATE_STATE_AT_DIDMOUNT:
      return {
        ...state,
        formStatus: action.payload.formStatus,
        formErrors: action.payload.formErrors,
      };

    default:
      throw new Error(`Invalid action: ${action.type}`);
  }
};

const useForm = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const resetSubmitResponse = () => {
    dispatch({ type: ACTIONS.RESET_SUBMIT_RESPONSE });
  };

  const setInputsState = (formStatus, inputsState) => {
    dispatch({ type: ACTIONS.SET_INPUTS_STATE, payload: { formStatus, inputsState } });
  };

  const setLoadingFormStatus = () => {
    dispatch({ type: ACTIONS.SET_LOADING_FORM_STATUS });
  };

  const setFailureSubmitResponse = message => {
    dispatch({ type: ACTIONS.SET_FAILURE_SUBMIT_RESPONSE, payload: { message } });
  };

  const setSuccessSubmitResponse = message => {
    dispatch({ type: ACTIONS.SET_SUCCESS_SUBMIT_RESPONSE, payload: { message } });
  };

  const updateErrorMessage = (inputName, errorMessage) => {
    dispatch({
      type: ACTIONS.UPDATE_ERROR_MESSAGE,
      payload: { inputName, errorMessage },
    });
  };

  const updateFormStatus = formStatus => {
    dispatch({ type: ACTIONS.UPDATE_FORM_STATUS, payload: { formStatus } });
  };

  const updateFormValues = formValues => {
    dispatch({ type: ACTIONS.UPDATE_FORM_VALUES, payload: { formValues } });
  };

  const updateInputState = (inputName, inputState) => {
    dispatch({ type: ACTIONS.UPDATE_INPUT_STATE, payload: { inputName, inputState } });
  };

  const updateInputValue = (inputName, inputValue) => {
    dispatch({ type: ACTIONS.UPDATE_INPUT_VALUE, payload: { inputName, inputValue } });
  };

  const updateStateAtDidMount = (formStatus, formErrors) => {
    dispatch({
      type: ACTIONS.UPDATE_STATE_AT_DIDMOUNT,
      payload: { formStatus, formErrors },
    });
  };

  return {
    state,

    resetSubmitResponse,
    setFailureSubmitResponse,
    setInputsState,
    setLoadingFormStatus,
    setSuccessSubmitResponse,
    updateErrorMessage,
    updateFormStatus,
    updateFormValues,
    updateInputState,
    updateInputValue,
    updateStateAtDidMount,
  };
};

export default useForm;

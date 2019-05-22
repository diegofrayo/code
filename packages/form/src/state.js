import React from 'react';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';
import { keyMirror } from './utils';

const INITIAL_STATE = {
  formErrors: {},
  formStatus: FORM_STATUS.VALID,
  formValues: null,
  formInvalidInputs: {},
  submitResponse: {
    type: FORM_SUBMIT_RESPONSE_TYPES.SUCCESS,
    message: '',
    show: false,
  },
};

const ACTIONS = keyMirror({
  RESET_SUBMIT_RESPONSE: 0,
  SET_FORM_ERRORS: 0,
  SET_FORM_INVALID_INPUTS: 0,
  SET_LOADING_FORM_STATUS: 0,
  SET_FAILURE_SUBMIT_RESPONSE: 0,
  SET_SUCCESS_SUBMIT_RESPONSE: 0,
  UPDATE_ERROR_MESSAGE: 0,
  UPDATE_FORM_STATUS: 0,
  UPDATE_FORM_VALUES: 0,
  UPDATE_INPUT_VALUE: 0,
});

const reducerActions = {
  RESET_SUBMIT_RESPONSE: state => {
    return { ...state, submitResponse: INITIAL_STATE.submitResponse };
  },

  SET_FORM_ERRORS: (state, action) => {
    return {
      ...state,
      formErrors: action.payload.formErrors,
      formInvalidInputs: ((formInvalidInputs, formErrors) => {
        const formInvalidInputsUpdated = Object.keys(formErrors).reduce(
          (result, inputName) => {
            // eslint-disable-next-line
            result[inputName] = true;

            return result;
          },
          { ...formInvalidInputs },
        );

        return formInvalidInputsUpdated;
      })(state.formInvalidInputs, action.payload.formErrors),
    };
  },

  SET_FORM_INVALID_INPUTS: (state, action) => {
    return {
      ...state,
      formInvalidInputs: action.payload.formInvalidInputs,
    };
  },

  SET_LOADING_FORM_STATUS: state => {
    return {
      ...state,
      formStatus: FORM_STATUS.LOADING,
      submitResponse: INITIAL_STATE.submitResponse,
    };
  },

  SET_SUCCESS_SUBMIT_RESPONSE: (state, action) => {
    return {
      ...state,
      formStatus: FORM_STATUS.VALID,
      submitResponse: {
        show: true,
        type: FORM_SUBMIT_RESPONSE_TYPES.SUCCESS,
        message: action.payload.message,
      },
    };
  },

  SET_FAILURE_SUBMIT_RESPONSE: (state, action) => {
    return {
      ...state,
      formStatus: FORM_STATUS.VALID,
      submitResponse: {
        show: true,
        type: FORM_SUBMIT_RESPONSE_TYPES.FAILURE,
        message: action.payload.message,
      },
    };
  },

  UPDATE_ERROR_MESSAGE: (state, action) => {
    const stateUpdates = ((formErrors, formInvalidInputs) => {
      const formErrorsUpdated = { ...formErrors };
      const formInvalidInputsUpdated = { ...formInvalidInputs };

      if (action.payload.errorMessage) {
        formErrorsUpdated[action.payload.inputName] = action.payload.errorMessage;
        formInvalidInputsUpdated[action.payload.inputName] = true;
      } else {
        delete formErrorsUpdated[action.payload.inputName];
        delete formInvalidInputsUpdated[action.payload.inputName];
      }

      return {
        formErrors: formErrorsUpdated,
        formInvalidInputs: formInvalidInputsUpdated,
      };
    })(state.formErrors, state.formInvalidInputs);

    return {
      ...state,
      ...stateUpdates,
    };
  },

  UPDATE_FORM_STATUS: (state, action) => {
    return { ...state, formStatus: action.payload.formStatus };
  },

  UPDATE_FORM_VALUES: (state, action) => {
    return { ...state, formValues: action.payload.formValues };
  },

  UPDATE_INPUT_VALUE: (state, action) => {
    return {
      ...state,
      formValues: {
        ...state.formValues,
        [action.payload.inputName]: action.payload.inputValue,
      },
    };
  },

  default: (state, action) => {
    throw new Error(`Invalid action: ${action.type}`);
  },
};

const reducer = (state, action) => {
  const reducerAction = reducerActions[action.type] || reducerActions.default;
  return reducerAction(state, action);
};

const useForm = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const resetSubmitResponse = () => {
    dispatch({ type: ACTIONS.RESET_SUBMIT_RESPONSE });
  };

  const setFormErrors = formErrors => {
    dispatch({
      type: ACTIONS.SET_FORM_ERRORS,
      payload: { formErrors },
    });
  };

  const setFormInvalidInputs = formInvalidInputs => {
    dispatch({
      type: ACTIONS.SET_FORM_INVALID_INPUTS,
      payload: { formInvalidInputs },
    });
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

  const updateInputValue = (inputName, inputValue) => {
    dispatch({ type: ACTIONS.UPDATE_INPUT_VALUE, payload: { inputName, inputValue } });
  };

  return {
    state,

    resetSubmitResponse,
    setFormErrors,
    setFormInvalidInputs,
    setLoadingFormStatus,
    setFailureSubmitResponse,
    setSuccessSubmitResponse,
    updateErrorMessage,
    updateFormStatus,
    updateFormValues,
    updateInputValue,
  };
};

export default useForm;

import React from 'react';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';
import { keyMirror, mergeActions } from './utils';

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

const ACTIONS = keyMirror([
  'RESET_SUBMIT_RESPONSE',
  'SET_FORM_ERRORS',
  'SET_FORM_INVALID_INPUTS',
  'SET_LOADING_FORM_STATUS',
  'SET_FAILURE_SUBMIT_RESPONSE',
  'SET_SUCCESS_SUBMIT_RESPONSE',
  'UPDATE_ERROR_MESSAGE',
  'UPDATE_FORM_STATUS',
  'UPDATE_FORM_VALUES',
  'UPDATE_INPUT_VALUE',
]);

const reducerActions = {
  [ACTIONS.RESET_SUBMIT_RESPONSE]: state => {
    return { ...state, submitResponse: INITIAL_STATE.submitResponse };
  },

  [ACTIONS.SET_FORM_ERRORS]: (state, action) => {
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

  [ACTIONS.SET_LOADING_FORM_STATUS]: state => {
    return {
      ...state,
      formStatus: FORM_STATUS.LOADING,
      submitResponse: { ...INITIAL_STATE.submitResponse },
    };
  },

  [ACTIONS.SET_SUCCESS_SUBMIT_RESPONSE]: (state, action) => {
    return {
      ...state,
      formStatus: FORM_STATUS.VALID,
      submitResponse: {
        show: true,
        type: FORM_SUBMIT_RESPONSE_TYPES.SUCCESS,
        message: action.payload,
      },
    };
  },

  [ACTIONS.SET_FAILURE_SUBMIT_RESPONSE]: (state, action) => {
    return {
      ...state,
      formStatus: FORM_STATUS.VALID,
      submitResponse: {
        show: true,
        type: FORM_SUBMIT_RESPONSE_TYPES.FAILURE,
        message: action.payload,
      },
    };
  },

  [ACTIONS.UPDATE_ERROR_MESSAGE]: (state, action) => {
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

  [ACTIONS.UPDATE_INPUT_VALUE]: (state, action) => {
    return {
      ...state,
      formValues: {
        ...state.formValues,
        [action.payload.inputName]: action.payload.inputValue,
      },
    };
  },

  ...mergeActions({
    actionTypes: [
      ACTIONS.UPDATE_FORM_VALUES,
      ACTIONS.UPDATE_FORM_STATUS,
      ACTIONS.SET_FORM_INVALID_INPUTS,
    ],
    reducer: (state, action) => {
      return { ...state, ...action.payload };
    },
  }),

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
    dispatch({ type: ACTIONS.SET_FAILURE_SUBMIT_RESPONSE, payload: message });
  };

  const setSuccessSubmitResponse = message => {
    dispatch({ type: ACTIONS.SET_SUCCESS_SUBMIT_RESPONSE, payload: message });
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
    ...state,

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

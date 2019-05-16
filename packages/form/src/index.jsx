import React from 'react';
import PropTypes from 'prop-types';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';
import {
  createFormDefaultValues,
  initializeInputsState,
  onInputChange,
  onSubmit,
  updaterErrorMessage,
  validateForm,
} from './utils';
import useForm from './state';

const Form = function Form({
  children,
  config: formConfig,
  defaultValues: formDefaultValues,
  onSubmit: onSubmitCallback,
  submitResponseMessages,
  validateAtDidMount,
}) {
  const {
    state: { formErrors, formStatus, formValues, inputsState, submitResponse },

    resetSubmitResponse,
    updateErrorMessage,
    updateFormErrors,
    updateFormStatus,
    updateFormValues,
    updateInputsState,
    updateInputState,
    updateInputValue,
    updateSubmitResponse,
  } = useForm();

  // componentDidMount
  React.useEffect(() => {
    const formValuesResult = createFormDefaultValues({ formDefaultValues, formConfig });

    if (validateAtDidMount) {
      const { formStatus: formStatusResult, formErrors: formErrorsResult } = validateForm(
        {
          formConfig,
          formValues: formValuesResult,
          formErrors,
        },
      );

      updateFormErrors(formErrorsResult);
      updateFormStatus(formStatusResult);
    } else {
      const {
        inputsState: inputsStateResult,
        formStatus: formStatusResult,
      } = initializeInputsState({
        formValues: formValuesResult,
        formConfig,
      });

      updateFormStatus(formStatusResult);
      updateInputsState(inputsStateResult);
    }

    updateFormValues(formValuesResult);
  }, []);

  if (!formValues) return null;

  return (
    <form>
      {children({
        errors: formErrors,
        onInputChange: onInputChange({
          inputsState,
          formConfig,
          formValues,
          updateErrorMessage,
          updateFormStatus,
          updateInputState,
          updateInputValue,
        }),
        onSubmit: onSubmit({
          formStatus,
          formConfig,
          formValues,
          resetSubmitResponse,
          updateFormStatus,
          updateSubmitResponse,

          onSubmitCallback,
          submitResponseMessages,
        }),
        resetSubmitResponse,
        status: formStatus,
        submitResponse,
        updaters: {
          updateErrorMessage: updaterErrorMessage({
            inputsState,
            updateErrorMessage,
            updateFormStatus,
            updateInputState,
          }),
          updateFormStatus,
          updateInputValue,
        },
        values: formValues,
      })}
    </form>
  );
};

Form.propTypes = {
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

Form.defaultProps = {
  defaultValues: {},
  submitResponseMessages: {},
  validateAtDidMount: false,
};

Form.STATUS = FORM_STATUS;

Form.SUBMIT_RESPONSE_TYPES = FORM_SUBMIT_RESPONSE_TYPES;

export default Form;

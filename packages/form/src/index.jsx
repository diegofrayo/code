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
} from './service';
import useForm from './state';

const Form = function Form({
  children,
  config: formConfig,
  defaultValues,
  onSubmit: onSubmitCallback,
  submitResponseMessages,
  validateAtDidMount,
}) {
  const {
    state: { formErrors, formStatus, formValues, inputsState, submitResponse },

    resetSubmitResponse,
    setInputsState,
    setLoadingFormStatus,
    setFailureSubmitResponse,
    setSuccessSubmitResponse,
    updateErrorMessage,
    updateFormStatus,
    updateFormValues,
    updateInputState,
    updateInputValue,
    updateStateAtDidMount,
  } = useForm();

  // componentDidMount
  React.useEffect(() => {
    const formDefaultValues = createFormDefaultValues(defaultValues, formConfig);

    if (validateAtDidMount) {
      const {
        formErrors: formErrorsResulting,
        formStatus: formStatusResulting,
      } = validateForm({
        formConfig,
        formErrors,
        formValues: formDefaultValues,
      });

      updateStateAtDidMount(formStatusResulting, formErrorsResulting);
    } else {
      const {
        formStatus: formStatusResulting,
        inputsState: inputsStateResulting,
      } = initializeInputsState(formDefaultValues, formConfig);

      setInputsState(formStatusResulting, inputsStateResulting);
    }

    updateFormValues(formDefaultValues);
  }, []);

  if (!formValues) return null;

  return (
    <form>
      {children({
        errors: formErrors,
        onInputChange: onInputChange({
          formConfig,
          formValues,
          inputsState,

          updateErrorMessage,
          updateFormStatus,
          updateInputState,
          updateInputValue,
        }),
        onSubmit: onSubmit({
          formConfig,
          formStatus,
          formValues,

          setLoadingFormStatus,
          setFailureSubmitResponse,
          setSuccessSubmitResponse,

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

import React from 'react';
import PropTypes from 'prop-types';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';
import FormService from './service';
import useForm from './state';
import { didMount } from './utils';

const Form = function Form({
  children,
  config: formConfig,
  defaultValues,
  onSubmit: onSubmitCallback,
  submitResponseMessages,
  validateAtDidMount,
}) {
  const {
    state: { formErrors, formInvalidInputs, formStatus, formValues, submitResponse },

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
  } = useForm();

  const formService = new FormService({
    props: {
      formConfig,
      onSubmitCallback,
      submitResponseMessages,
      validateAtDidMount,
    },
    state: {
      formErrors,
      formInvalidInputs,
      formStatus,
      formValues,
      submitResponse,
    },
    stateHandlers: {
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
    },
  });

  didMount(() => {
    const formDefaultValues = formService.createFormDefaultValues(
      defaultValues,
      formConfig,
    );
    const {
      formErrors: formErrorsOfInvalidInputs,
      formInvalidInputs: formInvalidInputsResulting,
    } = formService.getFormInvalidInputs(formConfig);

    setFormErrors(formErrorsOfInvalidInputs);
    setFormInvalidInputs(formInvalidInputsResulting);
    updateFormValues(formDefaultValues);

    if (validateAtDidMount) {
      const {
        formErrors: formErrorsResulting,
        formStatus: formStatusResulting,
      } = formService.validateForm({
        formConfig,
        formErrors,
        formInvalidInputs,
        formValues: formDefaultValues,
      });

      setFormErrors(formErrorsResulting);
      updateFormStatus(formStatusResulting);
    }
  });

  if (!formValues) return null;

  return (
    <form>
      {children({
        errors: formErrors,
        onInputChange: formService.onInputChange,
        onSubmit: formService.onSubmit,
        resetSubmitResponse,
        status: formStatus,
        submitResponse,
        updaters: {
          updateErrorMessage: formService.updateErrorMessage,
          updateFormStatus,
          updateInputValue,
        },
        values: formValues,
        validateAtDidMount,
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

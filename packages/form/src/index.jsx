import React from 'react';
import PropTypes from 'prop-types';

import { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES } from './constants';
import FormService from './service';
import useForm from './state';
import { componentDidMount } from './utils';

const Form = function Form({
  children,
  config: formConfig,
  defaultValues,
  onInputChangeParentHandler,
  onSubmit: onSubmitHandler,
  submitResponseMessages,
  validateAtDidMount,
}) {
  const {
    formErrors,
    formInvalidInputs,
    formStatus,
    formValues,
    submitResponse,

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
      onInputChangeParentHandler,
      onSubmitHandler,
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

  componentDidMount(() => {
    formService.validateFormConfig(formConfig);

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

  React.useEffect(() => {
    if (onInputChangeParentHandler) {
      onInputChangeParentHandler({ formErrors, formStatus, formValues });
    }
  }, [formValues]);

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
  onInputChangeParentHandler: PropTypes.func,
  submitResponseMessages: PropTypes.shape({
    success: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    failure: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  validateAtDidMount: PropTypes.bool,
};

Form.defaultProps = {
  defaultValues: {},
  onInputChangeParentHandler: undefined,
  submitResponseMessages: {},
  validateAtDidMount: false,
};

Form.STATUS = FORM_STATUS;

Form.SUBMIT_RESPONSE_TYPES = FORM_SUBMIT_RESPONSE_TYPES;

export default Form;

import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Button } from '@diegofrayo/components';
import { styled } from '@diegofrayo/styles';
import Form from '@diegofrayo/form';

const Container = styled(Box)(
  ({ theme, utilities, props }) => `
    display: ${utilities.if(props.show, 'block', 'none')};
    padding: ${theme.spacing.M} ${theme.spacing.L};
    position: relative;

    ${utilities.switch(props.type, {
      [Form.SUBMIT_RESPONSE_TYPES.SUCCESS]: `
        background-color: #437b43;
        color: white;
      `,
      [Form.SUBMIT_RESPONSE_TYPES.FAILURE]: `
        background-color: #bd5e5e;
        color: white;
      `,
    })}
  `,
);

const CloseButton = styled(Button)(
  ({ theme }) => `
    background-color: transparent;
    border: none;
    color: white;
    font-size: ${theme.fontSize.L};
    position: absolute;
    right: 10px;
    text-shadow: 1px 1px 2px #2E2E2E;
    top: 10px;
  `,
);

const SubmitResponse = ({ show, type, message, resetSubmitResponse, ...rest }) => {
  return (
    <Container type={type} show={show} {...rest}>
      {resetSubmitResponse && <CloseButton onClick={resetSubmitResponse}>x</CloseButton>}
      <Text>{message}</Text>
    </Container>
  );
};

SubmitResponse.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(Object.values(Form.SUBMIT_RESPONSE_TYPES)).isRequired,

  resetSubmitResponse: PropTypes.func,
};

SubmitResponse.defaultProps = {
  resetSubmitResponse: undefined,
};

export default SubmitResponse;

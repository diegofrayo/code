import React from 'react';
import PropTypes from 'prop-types';

import Form from '@diegofrayo/form';
import { vlt } from '@diegofrayo/validator';
import { Box, Loader } from '@diegofrayo/components';
import { Input } from '@diegofrayo/components/styled';
import { styled } from '@diegofrayo/styles';

const Container = styled(Box)(({ props, utils }) =>
  utils.if(props.isLoading, {
    true: `
      background-color: #d0d0d0;
      cursor: not-allowed;
      pointer-events: none;

      .dfr-input {
        background-color: inherit;
        display: inline;
        width: 90%;
      }

      .loader-container {
        display: inline-block;
        text-align: center;
        width: 10%;
      }

      .dfr-loader{
        vertical-align: middle;
      }
    `,
    false: `
      .loader-container {
        display: none;
      }
    `,
  }),
);

class InputEmail extends React.Component {
  state = {
    isLoading: false,
  };

  blurCounter = 1;

  validate = inputValue => {
    return vlt()
      .email()
      .allowEmpty()
      .validate(inputValue);
  };

  onBlur = event => {
    const {
      inputConfig,
      updaters: { updateErrorMessage, updateFormStatus },
    } = this.props;
    const { name, value } = event.currentTarget;
    const isValid = this.validate(value);

    if (!isValid) return;

    if (inputConfig.required) {
      updateFormStatus(Form.STATUS.INVALID);
    }

    this.setState({ isLoading: true });

    setTimeout(() => {
      this.blurCounter += 1;

      if (this.blurCounter % 2 === 0) {
        updateErrorMessage({ inputName: name, inputConfig, errorMessage: null });
      } else {
        updateErrorMessage({
          inputName: name,
          inputConfig,
          errorMessage:
            'This email is used by other account (It is just a random example)',
        });
      }

      this.setState({ isLoading: false });
    }, 2000);
  };

  onChange = event => {
    const {
      inputConfig,
      updaters: { updateErrorMessage, updateInputValue },
    } = this.props;
    const { name, value } = event.currentTarget;
    const isValid = this.validate(value);

    updateInputValue(name, value);

    if (!isValid) {
      updateErrorMessage({
        inputName: name,
        inputConfig,
        errorMessage: inputConfig.errorMessage,
      });
    } else {
      updateErrorMessage({ inputName: name, inputConfig, errorMessage: null });
    }
  };

  render() {
    const { updaters, ...rest } = this.props;
    const { isLoading } = this.state;

    return (
      <Container isLoading={isLoading} row>
        <Input onBlur={this.onBlur} onChange={this.onChange} {...rest} />
        <Box className="loader-container">
          <Loader />
        </Box>
      </Container>
    );
  }
}

InputEmail.propTypes = {
  updaters: PropTypes.object.isRequired,
  inputConfig: PropTypes.object.isRequired,
};

InputEmail.defaultProps = {};

export default InputEmail;

import React from 'react';
import PropTypes from 'prop-types';

import { vlt } from '@diegofrayo/vlt';
import { Box, Loader } from '@diegofrayo/components';
import { styled } from '@diegofrayo/styles';

import Input from './Input';

class InputEmail extends React.Component {
  state = {
    isLoading: false,
    error: '',
  };

  blurCounter = 1;

  errors = {
    default: 'Type a valid email',
    emailExists: 'This email is used by other account (It is just a random example)',
  };

  componentDidMount() {
    const {
      value,
      validateAtDidMount,
      updaters: { setInputState },
    } = this.props;
    if (this.validate(value)) {
      setInputState('email', true);
    } else {
      if (validateAtDidMount) {
        this.updateErrorMessage(this.errors.default);
      }
      setInputState('email', false);
    }
  }

  updateErrorMessage = errorMessage => {
    this.setState({ error: errorMessage });
  };

  validate = inputValue => {
    return vlt()
      .email()
      .allowEmpty()
      .validate(inputValue);
  };

  onBlur = event => {
    const {
      updaters: { setInputState },
    } = this.props;
    const { name, value } = event.currentTarget;
    const isValid = this.validate(value);

    if (!isValid) return;

    this.setState({ isLoading: true, error: '' });

    setTimeout(() => {
      this.blurCounter += 1;

      if (this.blurCounter % 2 === 0) {
        setInputState(name, true);
      } else {
        this.updateErrorMessage(this.errors.emailExists);
        setInputState(name, false);
      }

      this.setState({ isLoading: false });
    }, 2000);
  };

  onChange = event => {
    const {
      inputConfig,
      updaters: { setInputState, setInputValue },
    } = this.props;
    const { name, value } = event.currentTarget;
    const isValid = this.validate(value);

    setInputState(name, isValid);
    setInputValue(name, value);
    this.updateErrorMessage(isValid ? '' : inputConfig.errorMessage);
  };

  render() {
    const { updaters, ...rest } = this.props;
    const { isLoading, error } = this.state;

    return (
      <Container isLoading={isLoading} row>
        <Input onBlur={this.onBlur} onChange={this.onChange} {...rest} />
        <Input.Error>{error}</Input.Error>
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
  value: PropTypes.string.isRequired,
  validateAtDidMount: PropTypes.bool,
};

InputEmail.defaultProps = {
  validateAtDidMount: false,
};

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

export default InputEmail;

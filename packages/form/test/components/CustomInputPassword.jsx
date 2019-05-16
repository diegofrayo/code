import React from 'react';

class CustomInputPassword extends React.Component {
  onChange = event => {
    const {
      updaters: { updateErrorMessage, updateInputValue },
      inputConfig,
    } = this.props;
    const { name, value } = event.currentTarget;
    const isValid = inputConfig.handlers.isValid(value);

    updateInputValue(name, value);

    if (!isValid) {
      updateErrorMessage({
        inputName: name,
        inputConfig,
        errorMessage: inputConfig.errorMessage,
      });
    } else {
      updateErrorMessage({
        inputName: name,
        inputConfig,
        errorMessage: null,
      });
    }
  };

  render() {
    const { errorMessage, inputConfig, value } = this.props;

    return (
      <section>
        <label htmlFor={inputConfig.htmlAttrs.id}>
          {`Bio ${inputConfig.required ? '*' : ''}`}
          <input
            name="password"
            value={value}
            data-testid="input-password"
            onChange={this.onChange}
            {...inputConfig.htmlAttrs}
          />
        </label>
        <p>{errorMessage}</p>
      </section>
    );
  }
}

export default CustomInputPassword;

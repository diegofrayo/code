import React from 'react';

import Form from 'src';
import CustomInputPassword from './CustomInputPassword';

const CustomError = function CustomError(message, data) {
  this.name = 'MyHttpError';
  this.message = message || 'Default Message';
  this.stack = new Error().stack;
  this.data = data;
};

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

class FormTest extends React.Component {
  counter = 0;

  onSubmit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { onSubmit } = this.props;
        this.counter += 1;

        if (this.counter % 2 === 0) {
          const response = {
            error: true,
            data: { message: 'Sign up failed', code: '001' },
          };

          onSubmit({ error: true });

          return reject(new CustomError(response.message, response.data));
        }

        onSubmit({ error: false });

        return resolve();
      }, 2000);
    });
  };

  render() {
    const { defaultValues, formConfig, validateAtDidMount } = this.props;

    return (
      <Form
        defaultValues={defaultValues}
        config={formConfig}
        onSubmit={this.onSubmit}
        validateAtDidMount={validateAtDidMount}
        submitResponseMessages={{
          failure: res => res.data.message,
          success: 'Sign up successful',
        }}
      >
        {({
          errors,
          onInputChange,
          onSubmit,
          status,
          submitResponse,
          updaters,
          values,
        }) => {
          return (
            <section>
              <section>
                <label htmlFor={formConfig.email.htmlAttrs.id}>
                  {`Email ${formConfig.email.required ? '*' : ''}`}
                  <input
                    name="email"
                    value={values.email}
                    onChange={onInputChange}
                    data-testid="input-email"
                    {...formConfig.email.htmlAttrs}
                  />
                </label>
                <p>{errors.email}</p>
              </section>

              <section>
                <CustomInputPassword
                  value={values.password}
                  updaters={updaters}
                  inputConfig={formConfig.password}
                  errorMessage={errors.password}
                />
              </section>

              <section>
                <label htmlFor={formConfig.bio.htmlAttrs.id}>
                  {`Bio ${formConfig.bio.required ? '*' : ''}`}
                  <input
                    name="bio"
                    value={values.bio}
                    onChange={onInputChange}
                    data-testid="input-bio"
                    {...formConfig.bio.htmlAttrs}
                  />
                </label>
                <p>{errors.bio}</p>
              </section>

              <section>
                <label htmlFor={formConfig.birthDate.htmlAttrs.id}>
                  {`Birth Date ${formConfig.birthDate.required ? '*' : ''}`}
                  <input
                    name="birthDate"
                    value={values.birthDate}
                    onChange={onInputChange}
                    data-testid="input-birth-date"
                    {...formConfig.birthDate.htmlAttrs}
                  />
                </label>
                <p>{errors.birthDate}</p>
              </section>

              <section>
                <label htmlFor={formConfig.age.htmlAttrs.id}>
                  {`Age ${formConfig.age.required ? '*' : ''}`}
                  <input
                    name="age"
                    value={values.age}
                    onChange={onInputChange}
                    data-testid="input-age"
                    {...formConfig.age.htmlAttrs}
                  />
                </label>
                <p>{errors.age}</p>
              </section>

              {submitResponse.show && (
                <p
                  className={
                    submitResponse.type === Form.SUBMIT_RESPONSE_TYPES.SUCCESS
                      ? 'success'
                      : 'false'
                  }
                  data-testid="submit-response"
                >
                  {submitResponse.message}
                </p>
              )}

              <button
                disabled={status !== Form.STATUS.VALID}
                type="submit"
                onClick={onSubmit}
                data-testid="button-submit"
              >
                {status === Form.STATUS.LOADING ? 'Loading...' : 'Sign Up'}
              </button>
            </section>
          );
        }}
      </Form>
    );
  }
}

export default FormTest;

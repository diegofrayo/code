import 'core-js/shim';
import 'regenerator-runtime/runtime';
import 'jest-dom/extend-expect';
import React from 'react';

// eslint-disable-next-line
import { fireEvent, render, waitForElement, wait } from './utils/setup';

import Form from './components/Form';
import formConfig from './components/formConfig';

describe('Form Component', () => {
  test('create and submit form', async () => {
    const DEFAULT_VALUES = { email: 'diegofrayo@gmail.com', birthDate: '2019-04-19' };
    const PASSWORD_ERROR_MESSAGE = 'Custom input password error message';
    const onSubmitMock = jest.fn();

    const {
      findByTestId,
      findByText,
      queryByLabelText,
      queryByTestId,
      queryByText,
    } = render(
      <Form
        defaultValues={DEFAULT_VALUES}
        formConfig={formConfig}
        onSubmit={onSubmitMock}
      />,
    );

    const inputEmail = await findByTestId('input-email');
    const inputPassword = await findByTestId('input-password');
    const inputBio = await findByTestId('input-bio');
    const buttonSubmit = await findByTestId('button-submit');
    const getContainerSubmitResponse = () => queryByTestId('submit-response');

    expect(buttonSubmit.disabled).toBe(false);

    // Test defaultValues (email and birthDate)
    expect(inputEmail).toHaveAttribute('value', DEFAULT_VALUES.email);
    expect(await findByTestId('input-birth-date')).toHaveAttribute(
      'value',
      DEFAULT_VALUES.birthDate,
    );

    // Test labels text (required or no)
    expect(await queryByLabelText('Email *', { exact: true })).toBeInTheDocument();
    expect(await queryByLabelText('Bio', { exact: true })).toBeInTheDocument();

    // Test email error message
    fireEvent.change(inputEmail, {
      target: { value: 'invalid-email' },
    });
    expect(await findByText(formConfig.email.errorMessage)).toBeInTheDocument();

    // Test email error message
    fireEvent.change(inputEmail, {
      target: { value: DEFAULT_VALUES.email },
    });
    expect(await queryByText(formConfig.email.errorMessage)).not.toBeInTheDocument();
    expect(buttonSubmit.disabled).toBe(false);

    // Test password error message
    fireEvent.change(inputPassword, {
      target: { value: '123' },
    });
    expect(await findByText(PASSWORD_ERROR_MESSAGE)).toBeInTheDocument();
    expect(buttonSubmit.disabled).toBe(true);

    // Test password error message
    fireEvent.change(inputPassword, {
      target: { value: 'MyPass123' },
    });
    expect(await queryByText(PASSWORD_ERROR_MESSAGE)).not.toBeInTheDocument();
    expect(buttonSubmit.disabled).toBe(false);
    expect(await getContainerSubmitResponse()).not.toBeInTheDocument();

    // Test form status
    fireEvent.change(inputEmail, {
      target: { value: 'newemail@gmail.com' },
    });
    fireEvent.change(inputPassword, {
      target: { value: '0' },
    });
    fireEvent.change(inputBio, {
      target: { value: 'good' },
    });
    expect(buttonSubmit.disabled).toBe(true);

    fireEvent.change(inputEmail, {
      target: { value: 'anotheremail@gmail.com' },
    });
    expect(buttonSubmit.disabled).toBe(true);

    fireEvent.change(inputEmail, {
      target: { value: DEFAULT_VALUES.email },
    });
    fireEvent.change(inputPassword, {
      target: { value: 'validpassword' },
    });
    expect(buttonSubmit.disabled).toBe(false);

    fireEvent.change(inputBio, {
      target: { value: '1' },
    });
    expect(buttonSubmit.disabled).toBe(true);

    fireEvent.change(inputBio, {
      target: { value: 'can be empty or more two characters' },
    });
    expect(buttonSubmit.disabled).toBe(false);

    // Test submit behaviour
    fireEvent.click(buttonSubmit);

    // Test if submit response is successful
    expect(await waitForElement(() => getContainerSubmitResponse())).toBeInTheDocument();
    expect(await queryByText('Sign up successful')).toBeInTheDocument();
    expect(onSubmitMock.mock.calls.length).toBe(1);
    expect(onSubmitMock.mock.calls[0][0]).toEqual({ error: false });

    // Test submit behaviour
    fireEvent.click(buttonSubmit);

    // Test if submit response is hidden while submit request is loading
    expect(await getContainerSubmitResponse()).not.toBeInTheDocument();

    // Test if submit response is failed when the request is resolved
    expect(await waitForElement(() => getContainerSubmitResponse())).toBeInTheDocument();
    expect(await queryByText('Sign up failed')).toBeInTheDocument();
    expect(onSubmitMock.mock.calls.length).toBe(2);
    expect(onSubmitMock.mock.calls[1][0]).toEqual({ error: true });
  });

  test(`test 'validateAtDidMount' prop`, async () => {
    const DEFAULT_VALUES = {
      email: '',
      password: '12345',
      bio: '1',
      birthDate: '2019-04-19',
    };

    const { findByTestId } = render(
      <Form defaultValues={DEFAULT_VALUES} formConfig={formConfig} validateAtDidMount />,
    );

    expect((await findByTestId('button-submit')).disabled).toBe(true);
  });
});

export default {
  children: `See <a href="#children">#children</a>`,

  config: 'See <a href="#config">#config</a>',

  onSubmit: `It is executed when the form is submitted
    <br />
    <strong>IMPORTANT:</strong> This function must return a <code>Promise</code>
  `,

  initialValues: `Form's inputs initial values`,

  onInputChangeParentHandler:
    'This callback is executed when an input changes. It receives as parameters <code>Form</code> state object',

  validateAtDidMount:
    'Flag to set if the form must be validated when the component is being mounted or no',

  submitResponseMessages: `Contains the messages to show after <code>onSubmit</code> callback is executed`,

  'submitResponseMessages/success': `This message shows when <code>onSubmit</code> promise is resolved`,

  'submitResponseMessages/failure': `This messages shows when <code>onSubmit</code> promise is rejected`,
};

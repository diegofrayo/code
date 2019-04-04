export default {
  children: `See <a href="#children">#children</a>`,

  config: 'See <a href="#config">#config</a>',

  onSubmit: `It is executed when the form is submitted
    <br />
    <strong>IMPORTANT:</strong> This function must return a <code>Promise</code>
  `,

  defaultValues: `Form's inputs default values`,

  validateAtDidMount:
    'Flag to set if the form must be validated when the component is being mounted or no',

  submitResponseMessages: `Contains the messages to show after <code>onSubmit</code> callback is executed`,

  'submitResponseMessages/success': `This message shows when <code>onSubmit</code> promise is resolved`,

  'submitResponseMessages/failure': `This messages shows when <code>onSubmit</code> promise is rejected`,
};

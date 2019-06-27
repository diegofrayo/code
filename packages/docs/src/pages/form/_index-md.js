export default {
  children: `
- \`errors\`
    * **Type:** \`Object\`
    * **Description:** Contains the error message of each invalid input

- \`onInputChange\`
    * **Type:** \`Function\`
    * **Description:** Validates and updates an input value

- \`submitResponse\`
    * It is a \`SUBMIT RESPONSE\` object (See [#SUBMIT RESPONSE](#submit-response))

- \`onSubmit\`
    * **Type:** \`Function\`
    * **Description:** This function updates the form's status, transforms its values, passes them to \`onSubmit\` callback (See [#props](#props)) and after this callback is executed, \`submitResponse\` is updated

- \`resetSubmitResponse\`
    * **Type:** \`Function\`
    * **Description:** Reset \`submitResponse\` value (See [#SUBMIT RESPONSE](#submit-response))

- \`status\`
    * **Type:** \`Integer\`
    * **Description:** Form's status (See [#FORM STATUS](#form-status))

- \`values\`
    * **Type:** \`Object\`
    * **Description:** Form's inputs values

- \`validateAtDidMount\`
    * **Type:** \`Boolean\`
    * **Description:** validateAtDidMount prop value (See [#PROPS](#props))

- \`updaters\`
    * **Type:** \`Object\`
    * **Description:** Object with three functions to update form's state

        - \`setInputState(inputName, inputState)\`
            - **Type:** \`Function\`
            - **Description:** Updates an input's state. If the input value is valid, inputState should be true, else, false

        - \`setInputValue(inputName, inputValue)\`
            - **Type:** \`Function\`
            - **Description:** Updates an input's value

`,

  config: `
- \`type\`
    * **Type:** \`String\`
    * **Required:** \`yes\`
    * **Description:** Required to create a \`defaultValue\` of the input
    * **Posible values**: \`string\` | \`number\` | \`bool\`

- \`errorMessage\`
    * **Type:** \`String\`
    * **Required:** \`no\`
    * **Description:** This message will be saved in \`errors\` object (See [#children](#children)) when the input value is invalid
    * **Default value:** \`''\`

- \`required\`
    * **Type:** \`Boolean\`
    * **Required:** \`no\`
    * **Default value:** \`false\`

- \`defaultValue\`
    * **Type:** \`Any\`
    * **Required:** \`no\`
    * **Default value:** This value will depend on \`type\` value that you set

- \`customValidation\`
    * **Type:** \`bool\`
    * **Required:** \`no\`
    * **Description:** Use it to avoid the form component validates an input automatically. Useful when you want to validate an input for yourself, for example, when an input's validation is asynchronous.
    * **Default value:** \`false\`

- \`handlers\`
    * **Type:** \`Object\`
    * **Required:** If \`customValidation\` is not true, \`isValid\` callback is required, so this attribute will be required, else, no
    * **Description:** Contains some callbacks to validate and transform the input value

        - \`isValid(value, values, formConfig)\`
            - **Type:** \`Function\`
            - **Params:**
                - **value:** Input's value
                - **values:** Form's inputs values
                - **formConfig:** Form's config
            - **Description:** Validates the input value
            - **Return:**
                - \`Boolean\`
                - \`Object\` with errorMessages
                - \`String\` to set error message for the current input

        - \`transformBeforeSave(value, values)\`
            - **Type:** \`Function\`
            - **Params:**
                - **value:** Input's value
                - **values:** Form's inputs values
            - **Description:** It is executed before save the input's value in \`values\` object (See [#children](#children))
            - **Return:** Transformed value

        - \`transformBeforeSubmit(value, values)\`
            - **Type:** \`Function\`
            - **Params:**
                - **value:** Input's value
                - **values:** Form's inputs values
            - **Description:** It is executed when the form is submitted, so the transformed values are passed to \`onSubmit\` callback (See [#children](#children))
            - **Return:** Transformed value
`,
};

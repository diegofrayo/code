import Validator from '@diegofrayo/validator';

export default {
  email: {
    type: 'string',
    required: true,
    customValidation: true,
    inputAttrs: {
      id: 'input-email',
      placeholder: 'email@domain.co',
      type: 'email',
    },
  },
  password: {
    type: 'string',
    required: true,
    errorMessage: 'The password must have at least 5 characters',
    inputAttrs: {
      id: 'input-password',
      placeholder: '',
      type: 'password',
      autoComplete: 'password',
    },
    handlers: {
      isValid: value => {
        return Validator(value)
          .minLength(5)
          .exec();
      },
    },
  },
  bio: {
    type: 'string',
    required: false,
    inputAttrs: {
      id: 'input-bio',
      placeholder: 'Bio',
      type: 'text',
    },
  },
  birthDate: {
    type: 'string',
    required: true,
    errorMessage: 'Select a birth date',
    inputAttrs: {
      id: 'input-birth-date',
      placeholder: '',
      type: 'date',
    },
    handlers: {
      isValid: value => {
        return Validator(value)
          .date()
          .exec();
      },
      transformBeforeSubmit: value => {
        const date = value.split('-');
        return `${date[2]}/${date[1]}/${date[0]}`;
      },
    },
  },
  age: {
    type: 'number',
    required: true,
    defaultValue: 18,
    errorMessage: 'Type a valid age',
    inputAttrs: {
      id: 'input-age',
      max: 80,
      min: 18,
      type: 'number',
    },
    handlers: {
      isValid: value => {
        return Validator(value)
          .number()
          .min(18)
          .max(80)
          .exec();
      },
      transformBeforeSave: value => {
        return Number(value);
      },
    },
  },
};

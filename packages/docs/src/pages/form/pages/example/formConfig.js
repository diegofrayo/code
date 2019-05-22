import { validate } from '@diegofrayo/validator';

export default {
  email: {
    type: 'string',
    required: true,
    customValidation: true,
    errorMessage: 'Please type a valid email',
    htmlAttrs: {
      id: 'input-email',
      placeholder: 'email@domain.co',
      type: 'email',
    },
  },
  password: {
    type: 'string',
    required: true,
    errorMessage: 'The password must have at least 5 characters',
    htmlAttrs: {
      id: 'input-password',
      placeholder: '',
      type: 'password',
      autoComplete: 'password',
    },
    handlers: {
      isValid: value => {
        return validate(value)
          .minLength(5)
          .exec();
      },
    },
  },
  bio: {
    type: 'string',
    required: false,
    errorMessage: 'The bio must have at least two characters or leave it empty',
    htmlAttrs: {
      id: 'input-bio',
      placeholder: 'Bio',
      type: 'text',
    },
    handlers: {
      isValid: value => {
        return validate(value)
          .minLength(2)
          .allowEmpty()
          .exec();
      },
    },
  },
  birthDate: {
    type: 'string',
    required: true,
    errorMessage: 'Select a birth date',
    htmlAttrs: {
      id: 'input-birth-date',
      placeholder: '',
      type: 'date',
    },
    handlers: {
      isValid: value => {
        return validate(value)
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
    htmlAttrs: {
      id: 'input-age',
      max: 80,
      min: 18,
      type: 'number',
    },
    handlers: {
      isValid: value => {
        return validate(value)
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

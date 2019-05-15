import { validate } from '@diegofrayo/validator';

export default {
  email: {
    type: 'string',
    required: true,
    errorMessage: 'Type a valid email',
    htmlAttrs: {
      id: 'input-email',
      placeholder: 'email@domain.co',
      type: 'email',
      required: '',
    },
    handlers: {
      isValid: value => {
        return validate(value)
          .email()
          .exec();
      },
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
      required: '',
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
    htmlAttrs: {
      id: 'input-bio',
      placeholder: 'Bio',
      type: 'text',
    },
    handlers: {
      isValid: value => {
        return validate(value)
          .string()
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
      required: '',
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
      required: '',
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

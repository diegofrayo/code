import { Box, Button as BaseButton, Label as BaseLabel } from '@diegofrayo/components';
import { styled } from '@diegofrayo/styles';

import Input from './Input';
import InputEmail from './InputEmail';
import SubmitResponse from './SubmitResponse';

export const Container = styled(Box)(
  () => `
    * {
      box-sizing: border-box;
    }
  `,
);

export const FormGroup = styled(Box)(({ props, utils }) => {
  const color = utils.ifProp(props.error, 'color', 'red');

  return `
    ${color}

    .dfr-input, .dfr-input:focus {
      ${color}
      outline-color: ${props.error ? 'indianred' : 'lightgray'};
    }
  `;
});

export const Label = styled(BaseLabel)(
  ({ theme }) => `
    display: block;
    font-weight: bold;
    margin-bottom: ${theme.spacing.XS};
  `,
);

export const Button = styled(BaseButton)(
  ({ theme, utils, props }) => `
    background-color: #006fa7;
    border: none;
    color: white;
    display: block;
    font-size: ${theme.fontSize.M};
    font-weight: bold;
    padding: ${theme.spacing.M} ${theme.spacing.S};
    text-transform: uppercase;
    width: 100%;

    ${utils.if(props.disabled, {
      true: `
        cursor: not-allowed;
        opacity: 0.7;
        pointer-events: none;
      `,
    })}
  `,
);

export { Input, InputEmail, SubmitResponse };

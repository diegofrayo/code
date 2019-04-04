import { arrayWithAliases } from '@diegofrayo/styles';

const CHOICES = {
  fontSize: arrayWithAliases(
    {
      XXS: '8px',
      XS: '12px',
      S: '14px',
      M: '16px',
      L: '18px',
      XL: '24px',
      XXL: '32px',
    },
    {
      default: '16px',
    },
  ),
  color: {
    black: ['#000', '#111', '...'],
    white: ['#fff', '#eee', '...'],
  },
  spacing: arrayWithAliases(
    {
      XXS: '2px',
      XS: '4px',
      S: '8px',
      M: '16px',
      L: '32px',
      XL: '64px',
      XXL: '128px',
    },
    { default: '16px' },
  ),
};

const theme = {
  spacing: arrayWithAliases(CHOICES.spacing, {
    inset: {},
  }),
  fontSize: arrayWithAliases(CHOICES.fontSize, {
    heading: CHOICES.fontSize.L,
    text: CHOICES.fontSize.M,
  }),
  color: arrayWithAliases(CHOICES.color, {
    primary: CHOICES.color.black[0],
    secundary: CHOICES.color.white[0],
  }),
};

export default theme;

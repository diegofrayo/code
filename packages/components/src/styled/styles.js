export default {
  Box: () =>
    `
      border: 1px solid lightblue;
    `,
  Input: ({ theme }) =>
    `
      border-radius: 5px;
      border: none;
      display: block;
      font-size: ${theme.fontSize.M};
      height: 50px;
      padding: ${theme.spacing.XS} ${theme.spacing.S};
      width: 100%;
    `,
};

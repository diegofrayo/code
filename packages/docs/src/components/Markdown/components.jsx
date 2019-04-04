import { styled } from '@diegofrayo/styles';

const Container = styled('section')(
  ({ theme }) => `
    margin-bottom: ${theme.spacing.L};

    a {
      color: #009dff;
      font-weight: bold;
      text-decoration: underline;

      :visited, :hover {
        color: #009dff;
      }
    }

    h1 {
      font-size: 2em;
      margin-bottom: ${theme.spacing.M};
    }

    h2 {
      border-bottom: 1px solid black;
      font-size: 1.5em;
      margin-bottom: ${theme.spacing.S};
      margin-top: ${theme.spacing.XL} * 2;
      padding-bottom: ${theme.spacing.S};
      padding-left: ${theme.spacing.S};
    }

    ul {
      list-style-type: square;
      margin: 0;
      margin-bottom: ${theme.spacing.M};
      padding: 0;
      padding-left: ${theme.spacing.L};
    }

    p {
      margin-bottom: ${theme.spacing.S};
      word-wrap: break-word;
    }

    code {
      background-color: #f4f6f9;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.02);
      color: #7D899C;
      font-family: "Source Code Pro", monospace;
      font-size: 0.8em;
      font-weight: 100;
      margin: 0 3px;
      padding: 2px 5px;
    }

    pre {
      border: 1px solid black;
      border-bottom: 5px solid black;
      overflow: auto;
      padding: ${theme.spacing.M};

      code {
        background-color: #f4f6f9;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.02);
        color: #7D899C;
        font-family: "Source Code Pro", monospace;
        font-size: 0.8em;
        font-weight: 100;
        margin: 0 3px;
        padding: 2px 5px;

        &::before {
          content: '';
        }

        &::after {
          content: '';
        }
      }
    }

    img {
      cursor: pointer;
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }

    blockquote {
      border-left: 5px solid black;
      color: black;
      margin-bottom: ${theme.spacing.M};
      padding-left: 10px;
    }
  `,
);

export default Container;

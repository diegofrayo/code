# styles

## Description

Utilities to create components and css styles usign [emotion.sh](https://emotion.sh)


## Installation

**Yarn**
```
yarn add @diegofrayo/styles --save
```

**NPM**
```
npm install @diegofrayo/styles --save
```


## Usage

- Create a styled component
  ```
  import { styled } from '@diegofrayo/styles';

  const Box = styled('div')(
    ({ theme, utils, props }) => `
      display: ${props.visible ? 'flex' : 'none'};
      margin: ${theme.spacing.small};
      ${utils.marginX(theme.spacing.medium)}
      ${utils.paddingY(theme.spacing[1])}
    `,
  );

  <Box visible>Text</Box>
  ```

- Create a CSS class
  ```
  import { css } from '@diegofrayo/styles';

  const cssClass = css(
    ({ theme, utils }) => `
      margin: ${theme.spacing.small};
      ${utils.marginX(theme.spacing.medium)}
      ${utils.paddingY(theme.spacing[1])}
    `,
  );

  <div css={cssClass}>...</div>
  ```

- Create a plain object for inline styles
  ```
  import { createStyles } from '@diegofrayo/styles';

  const styles = createStyles(({ theme, utils }) => ({
    margin: theme.spacing.small,
  }));

  <div style={styles}>...</div>
  ```

- Inject global styles
  ```
  import { injectGlobal } from '@diegofrayo/styles';

  injectGlobal(`
    a {
      color: blue
    }
  `);

  injectGlobal(
    ({ theme, utils }) => `
    a {
      color: ${theme.color.link}
    }
  `,
  );
  ```

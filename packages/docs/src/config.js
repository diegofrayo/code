import 'parse-prop-types';
import { theme } from '@diegofrayo/components';
import { injectGlobal, setTheme } from '@diegofrayo/styles';

setTheme(theme);
injectGlobal(`
  a, a:visited, a:hover, a:focus {
    color: #009dff;
  }
`);

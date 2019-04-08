import 'parse-prop-types';
import dfrzPkg from '@diegofrayo/utilities';
import { injectGlobal, setTheme } from '@diegofrayo/styles';
import { theme } from '@diegofrayo/components';

setTheme(theme);
injectGlobal(`
  a, a:visited, a:hover, a:focus {
    color: #009dff;
  }
`);

((window, document, dfrz) => {
  const APP_CONFIGURATION = {
    ENVIRONMENT: dfrz.getEnvironment(),
  };

  const addFlag = () => {
    const styleObject = document.createElement('div');

    styleObject.style.bottom = '10px';
    styleObject.style.height = '10px';
    styleObject.style.position = 'fixed';
    styleObject.style.right = '10px';
    styleObject.style.width = '10px';
    styleObject.style['background-color'] = '#f6ce7c';

    document.getElementsByTagName('body')[0].appendChild(styleObject);
  };

  const onReadyHandler = () => {
    const isLoggedIn = dfrz.getCookie('auth');

    if (APP_CONFIGURATION.ENVIRONMENT === 'production' && isLoggedIn === false) {
      dfrz.initGA('docs');
      addFlag();
    }
  };

  onReadyHandler();
})(window, document, dfrzPkg);

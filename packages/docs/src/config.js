import 'parse-prop-types';
import { theme } from '@diegofrayo/components';
import { injectGlobal, setTheme } from '@diegofrayo/styles';

setTheme(theme);
injectGlobal(`
  a, a:visited, a:hover, a:focus {
    color: #009dff;
  }
`);

((window, document) => {
  const APP_CONFIGURATION = {
    ENVIRONMENT:
      window.location.href.indexOf('localhost') !== -1 ? 'development' : 'production',
  };

  const getCookie = cname => {
    const cookieData = document.cookie.split(';');
    const name = `${cname}=`;

    for (let index = 0; index < cookieData.length; index += 1) {
      let cookieChunk = cookieData[index];

      while (cookieChunk.charAt(0) === ' ') {
        cookieChunk = cookieChunk.substring(1);
      }

      if (cookieChunk.indexOf(name) === 0) {
        return cookieChunk.substring(name.length, cookieChunk.length);
      }
    }

    return false;
  };

  const initGA = () => {
    /* eslint-disable */
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    /* eslint-enable */

    const location = window.location.href;

    window.ga('create', 'UA-98284306-1', 'auto', 'website', {
      location,
      page: '/docs',
      title: document.title,
    });
    window.ga('website.send', 'pageview');
  };

  const onReadyHandler = () => {
    const isLoggedIn = getCookie('auth');

    if (APP_CONFIGURATION.ENVIRONMENT === 'production' && isLoggedIn === false) {
      initGA();
    }
  };

  document.addEventListener('DOMContentLoaded', onReadyHandler, false);
})(window, document);

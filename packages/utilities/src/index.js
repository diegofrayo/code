const dfrz = {
  setCookie: (name = 'auth', value = true, expirationDays = 365, path = '/') => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * expirationDays);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=${path}`;
  },

  getCookie: (cname = 'auth') => {
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
  },

  initGA: (page = '') => {
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

    window.ga('create', 'UA-98284306-1', 'auto', 'website', {
      page: `/${page}`,
      title: document.title,
    });

    window.ga('website.send', 'pageview');
  },

  getEnvironment: () => {
    return window.location.href.indexOf('://localhost:') !== -1
      ? 'development'
      : 'production';
  },
};

export default dfrz;

import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';

import Container from './components';

const mdParser = new showdown.Converter({
  ghCompatibleHeaderId: true,
  rawHeaderId: true,
});

const environment =
  window.location.href.indexOf(':3000') !== -1
    ? ':3000'
    : 'https://diegofrayo-docs.netlify.app';

const isLocalLink = link => {
  return link.href.indexOf(environment) !== -1;
};

const configureLinks = () => {
  let mdViewerLinks = document.querySelectorAll('.md-viewer a');

  for (let i = 0, lth = mdViewerLinks.length; i < lth; i += 1) {
    const link = mdViewerLinks[i];
    if (isLocalLink(link)) continue;
    link.setAttribute('target', '_blank');
  }

  mdViewerLinks = null;
};

const Markdown = ({ md }) => {
  const html = mdParser.makeHtml(md, 'utf8');

  React.useEffect(() => {
    setTimeout(configureLinks, 1000);
  });

  return <Container className="md-viewer" dangerouslySetInnerHTML={{ __html: html }} />;
};

Markdown.propTypes = {
  md: PropTypes.string.isRequired,
};

export default Markdown;

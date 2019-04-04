import PropTypes from 'prop-types';

const generateSpacingProps = () => {
  const spacingOptions = ['margin', 'padding'];
  const options = ['', 'Left', 'Right', 'Top', 'Bottom', 'X', 'Y'];

  return options.reduce((acum, curr) => {
    spacingOptions.forEach(spacingOption => {
      // eslint-disable-next-line
      acum[`${spacingOption}${curr}`] = PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]);
    });

    return acum;
  }, {});
};

const cssPropTypes = {
  color: {
    bg: PropTypes.string,
    color: PropTypes.string,
  },

  spacing: {
    ...generateSpacingProps(),
  },

  layout: {
    display: PropTypes.oneOf(['inline', 'inline-block', 'block', 'flex', 'inherit']),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    verticalAlign: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  },

  fonts: {
    fontFamily: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontStyle: PropTypes.string,
    fontWeight: PropTypes.string,
    letterSpacing: PropTypes.string,
    lineHeight: PropTypes.string,
    textAlign: PropTypes.oneOf(['center', 'left', 'right', 'justify', 'inherit']),
  },
};

export default cssPropTypes;

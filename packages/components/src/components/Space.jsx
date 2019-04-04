import PropTypes from 'prop-types';
import { styled } from '@diegofrayo/styles';

import theme from '../theme';

const TYPE = {
  VERTICAL: 0,
  HORIZONTAL: 1,
};

const Space = styled('div')(
  ({ props, utilities }) => `
    ${utilities.ifProp(props.type === TYPE.HORIZONTAL, 'display', 'inline-block')}
    ${utilities.if(
      props.type === TYPE.VERTICAL,
      utilities.marginY(props.size),
      utilities.marginX(props.size),
    )}
  `,
);

Space.TYPE = TYPE;

Space.SIZE = theme.spacing;

Space.propTypes = {
  size: PropTypes.oneOf(Space.SIZE),
  type: PropTypes.oneOf(Object.values(Space.TYPE)),
};

Space.defaultProps = {
  size: Space.SIZE.M,
  type: Space.TYPE.VERTICAL,
};

export default Space;

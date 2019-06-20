import PropTypes from 'prop-types';
import { styled } from '@diegofrayo/styles';

import theme from '../theme';

const TYPE = {
  VERTICAL: 0,
  HORIZONTAL: 1,
};

const Space = styled('div')(
  ({ props, utils }) => `
    ${utils.ifProp(props.type === TYPE.HORIZONTAL, 'display', 'inline-block')}
    ${utils.if(
      props.type === TYPE.VERTICAL,
      utils.marginY(props.size),
      utils.marginX(props.size),
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

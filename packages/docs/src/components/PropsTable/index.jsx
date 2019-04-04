import React from 'react';
import PropTypes from 'prop-types';
import parsePropTypes from 'parse-prop-types';
import { Space } from '@diegofrayo/components';

import { PropsTable as PropsTableComponent, Container } from './components';

class PropsTable extends React.Component {
  render() {
    const { component, propsDescription } = this.props;
    const propTypes = parsePropTypes(component);

    const shapes = Object.entries(propTypes).reduce((acum, [propKey, propValue]) => {
      if (propValue.type.name === 'shape') {
        acum.push({ name: propKey, value: propValue.type.value });
      }
      return acum;
    }, []);

    return (
      <Container>
        <PropsTableComponent
          parsedPropTypes={propTypes}
          propsDescription={propsDescription}
        />
        <Space />
        {shapes.map(shape => {
          return (
            <Container key={shape.name}>
              <PropsTableComponent.Title>{shape.name}</PropsTableComponent.Title>
              <PropsTableComponent
                parentName={shape.name}
                parsedPropTypes={shape.value}
                propsDescription={propsDescription}
              />
            </Container>
          );
        })}
      </Container>
    );
  }
}

PropsTable.propTypes = {
  component: PropTypes.any.isRequired,

  propsDescription: PropTypes.object,
};

PropsTable.defaultProps = {
  propsDescription: {},
};

export default PropsTable;

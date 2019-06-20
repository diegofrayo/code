import React from 'react';
import PropTypes from 'prop-types';
import { styled, utils as stylesUtilities } from '@diegofrayo/styles';
import { Box } from '@diegofrayo/components';

const getDefaultValue = defaultValue => {
  if (defaultValue === undefined) {
    return '';
  }

  if (typeof defaultValue.value === 'object') {
    return JSON.stringify(defaultValue.value);
  }

  return String(defaultValue.value);
};

const Table = styled('table')(
  () => `
    border-collapse: collapse;

    code {
      background-color: #f4f6f9;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.02);
      color: #7D899C;
      font-family: "Source Code Pro",monospace;
      font-size: 0.8em;
      font-weight: 100;
      margin: 0 3px;
      padding: 2px 5px;
    }
  `,
);

const Header = styled('thead')(
  () => `
    background-color: #1d293a;
    border: 1px solid #324048;
  `,
);

const Body = styled('tbody')(
  () => `
    border: 1px solid #324048;
  `,
);

const Cell = styled('td')(
  ({ props, theme }) => `
    border-bottom: 1px solid #324048;
    font-size: ${theme.fontSize.M};
    padding: ${theme.spacing.S};
    text-align: ${props.align}
  `,
);

Header.Cell = styled(Cell)(
  () => `
    border-bottom: none;
    font-weight: 700;
  `,
);

const Row = styled('tr')();

const PropsTable = ({ parsedPropTypes, propsDescription, parentName }) => {
  return (
    <Table>
      <Header>
        <tr>
          <Header.Cell>Name</Header.Cell>
          <Header.Cell align="center">Type</Header.Cell>
          <Header.Cell align="center">Required</Header.Cell>
          <Header.Cell align="center">Default value</Header.Cell>
          <Header.Cell>Description</Header.Cell>
        </tr>
      </Header>
      <Body>
        {Object.entries(parsedPropTypes).map(([key, value]) => {
          return (
            <Row key={key}>
              <Cell>{key}</Cell>
              <Cell
                align="center"
                dangerouslySetInnerHTML={{
                  __html: stylesUtilities.switch(value.type.name, {
                    oneOfType: val => `
                      ${val.type.name} <br />
                      <code>${val.type.value.map(v => v.name).join(' | ')}</code>
                    `,
                    default: val => val.type.name,
                  })(value),
                }}
              />
              <Cell align="center">{value.required === true ? 'yes' : 'no'}</Cell>
              <Cell align="center">{getDefaultValue(value.defaultValue)}</Cell>
              <Cell
                dangerouslySetInnerHTML={{
                  __html:
                    propsDescription[parentName ? `${parentName}/${key}` : key] || '',
                }}
              />
            </Row>
          );
        })}
      </Body>
    </Table>
  );
};

PropsTable.Title = styled('h3')(
  () => `
    border-bottom: 1px dashed #CED4DE;
    font-size: 22px;
    font-weight: 700;
    margin: 25px 0 20px;
  `,
);

PropsTable.propTypes = {
  parsedPropTypes: PropTypes.object.isRequired,

  parentName: PropTypes.string,
  propsDescription: PropTypes.object,
};

PropsTable.defaultProps = {
  parentName: '',
  propsDescription: {},
};

const Container = styled(Box)(
  () => `
    max-width: 100%;
    overflow: auto;
  `,
);

export { PropsTable, Container };

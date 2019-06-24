import React from 'react';

import { Text } from '@diegofrayo/components';
import { Input as BaseInput } from '@diegofrayo/components/styled';
import { styled } from '@diegofrayo/styles';

const Input = styled(BaseInput)();

// eslint-disable-next-line
Input.Error = ({ children }) => {
  if (children) {
    return (
      <Text fontSize={3} marginTop="0">
        {children}
      </Text>
    );
  }

  return null;
};

export default Input;

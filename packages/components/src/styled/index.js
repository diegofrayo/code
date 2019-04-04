import { styled, setTheme } from '@diegofrayo/styles';

import Box from '../components/Box.jsx';
import Button from '../components/Button.jsx';
import Heading from '../components/Heading.jsx';
import Input from '../components/Input.jsx';
import Label from '../components/Label.jsx';
import Loader from '../components/Loader.jsx';
import Space from '../components/Space.jsx';
import Text from '../components/Text.jsx';

import theme from '../theme';
import Styles from './styles';

setTheme(theme);

export default {
  Box: styled(Box)(Styles.Box),
  Button,
  Heading,
  Input: styled(Input)(Styles.Input),
  Label,
  Loader,
  Space,
  Text,
  theme,
};

import { whiten, mode, darken } from '@chakra-ui/theme-tools';

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: 'primary',
      color: 'white',
      _hover: {
        bg: mode(darken('primary', 20), whiten('primary', 20))(props),
        boxShadow: 'md',
      },
    }),
    secondary: (props) => ({
      bg: 'secondary',
      color: 'white',
      _hover: {
        bg: mode(darken('secondary', 20), whiten('secondary', 20))(props),
        boxShadow: 'md',
      },
    }),
    secondaryOutline: (props) => ({
      border: '1px solid',
      bg: 'transparent',
      borderColor: 'secondary',
      color: 'secondary',
      _hover: {
        boxShadow: 'md',
        transform: 'scale(1.02)',
      },
    }),
    danger: (props) => ({
      bg: 'danger',
      color: 'white',
      _hover: {
        bg: mode(darken('danger', 20), whiten('danger', 20))(props),
        boxShadow: 'md',
      },
    }),
    warning: (props) => ({
      bg: 'warning',
      color: 'white',
      _hover: {
        bg: mode(darken('warning', 20), whiten('warning', 20))(props),
        boxShadow: 'md',
      },
    }),
    highlight: (props) => ({
      bg: 'highlight',
      color: 'white',
      _hover: {
        bg: mode(darken('highlight', 20), whiten('highlight', 20))(props),
        boxShadow: 'md',
      },
    }),
    customRed: (props) => ({
      bg: 'customRed',
      color: 'white',
      _hover: {
        bg: mode(darken('customRed', 10), whiten('customRed', 10))(props),
        boxShadow: 'md',
        transform: 'scale(1.02)',
      },
    }),
  },
  defaultProps: {},
};

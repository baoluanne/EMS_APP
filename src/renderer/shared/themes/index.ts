import { createTheme } from '@mui/material';

export const COLOR = {
  green: '#20B24C',
  greenSecondary: '#ccead7',
  yellowGreen: '#cddc36',
  grey: '#495057',
  greySecondary: '#ced4da',
  greyTertiary: '#d9d9d9',
  white: '#ffffff',
  whiteSecondary: '#f8f7fa',
  black: '#2a2a2a',
  blackSecondary: '#585858',
  orange: '#FF9F43',
  orangeSecondary: '#FFE5CD',
  red: '#D32F2F',
  redSecondary: '#F3C7C7',
  blue: '#25359D',
  blueSecondary: '#4B7FF0',
};

export const DEFAULT_BOX_SHADOW = '0px 0px 20px 0px #0000001A;';

export const theme = createTheme({
  typography: {
    fontFamily: '',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1rem',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.4,
    },
    fontSize: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '',
        },
        a: {
          fontSize: '12px !important',
        },
        span: {
          fontSize: '12px !important',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-outlined.MuiInputLabel-sizeSmall': {
            fontSize: '12px !important',
            transform: 'translate(14px, 8px) scale(1)',
            '&.Mui-focused': {
              transform: 'translate(14px, -9px) scale(1)',
            },
          },
          '& .MuiFormLabel-filled.MuiInputLabel-sizeSmall': {
            transform: 'translate(14px, -9px) scale(1)',
          },
          '& .MuiInputBase-input.MuiInputBase-inputSizeSmall': {
            fontSize: '12px !important',
            height: '32px',
            padding: '0 14px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          '&.MuiInputBase-inputSizeSmall': {
            fontSize: '12px !important',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
        outlined: {
          '&.MuiInputLabel-sizeSmall': {
            fontSize: '12px !important',
            transform: 'translate(14px, 8px) scale(1)',
            backgroundColor: '#fff',
            '&.Mui-focused': {
              transform: 'translate(14px, -9px) scale(1)',
              padding: '0 5px',
            },
          },
          '&.MuiFormLabel-filled.MuiInputLabel-sizeSmall': {
            transform: 'translate(14px, -9px) scale(1)', // scale(0.75)
            color: 'var(--mui-palette-primary-main)',
            backgroundColor: '#fff',
            padding: '0 5px',
          },
          '&.MuiFormLabel-root': {
            padding: '0 5px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.MuiCheckbox-sizeSmall': {
            padding: 0,
            paddingLeft: '9px',
            paddingRight: '2px',
            margin: '0',
          },
          '+.MuiFormControlLabel-label': {
            fontSize: '12px !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'unset',
          fontSize: '12px',
          boxShadow: 'unset',
          variants: [
            {
              props: { variant: 'contained' },
              style: { color: 'white' },
            },
          ],
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '12px',
        },
      },
    },
  },
});

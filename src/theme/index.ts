import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// 2. Extend the theme to include custom colors, fonts, etc
const semanticTokens = {
  colors: {
    darkBlue: 'hsl(209, 23%, 22%)',
    veryDarkBlue: 'hsl(207, 26%, 17%)',
    backgroundWhite: {
      default: 'hsl(0, 0%, 100%)',
      _dark: 'hsl(209, 23%, 22%)'
    }
  }
};

const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  '2xl': '1920px'
};

const fonts = {
  heading: '\'Nunito Sans\', sans-serif',
  body: '\'Nunito Sans\', sans-serif'
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const styles = {
  global: (props: any) => ({
    body: {
      backgroundColor: mode('hsl(0, 0%, 98%)', 'hsl(207, 26%, 17%)')(props),
      color: mode('hsl(200, 15%, 8%)', 'hsl(0, 0%, 100%)')(props)
    }
  })
};

export const theme = extendTheme({ breakpoints, config, semanticTokens, fonts, styles });

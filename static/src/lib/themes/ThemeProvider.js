import { ThemeProvider as ThemeUiProvider } from '@theme-ui/core';
import theme from './theme';
import { ColorModeProvider } from '@theme-ui/color-modes';

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeUiProvider {...{theme}}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ThemeUiProvider>
  );
}

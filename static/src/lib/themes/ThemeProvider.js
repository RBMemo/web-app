import { ThemeProvider as ThemeUiProvider } from '@theme-ui/core';
import { ColorModeProvider } from '@theme-ui/color-modes';
import { SkeletonTheme } from 'react-loading-skeleton';
import theme, { skeletonTheme } from './theme';

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeUiProvider {...{theme}}>
      <ColorModeProvider>
        <SkeletonTheme {...skeletonTheme}>
          {children}
        </SkeletonTheme>
      </ColorModeProvider>
    </ThemeUiProvider>
  );
}

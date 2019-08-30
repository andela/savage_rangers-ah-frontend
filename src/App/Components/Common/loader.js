import React from 'react';
import { Dots } from '@zendeskgarden/react-loaders';
import { ThemeProvider } from '@zendeskgarden/react-theming';

export const loader = () => (
  <ThemeProvider>
    <Dots />
  </ThemeProvider>
);

export default loader;

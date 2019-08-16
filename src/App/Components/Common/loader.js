import React from 'react';
import { Dots } from '@zendeskgarden/react-loaders';
import { ThemeProvider } from '@zendeskgarden/react-theming';

export default function loader() {
  return (
    <ThemeProvider>
      <Dots />
    </ThemeProvider>
  );
}

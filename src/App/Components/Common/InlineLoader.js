import React from 'react';
import { Inline } from '@zendeskgarden/react-loaders';
import { ThemeProvider } from '@zendeskgarden/react-theming';

function InlineLoader() {
  return (
    <ThemeProvider>
      <Inline size="68" />
    </ThemeProvider>
  );
}

export default InlineLoader;

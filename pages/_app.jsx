import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import { useApollo } from '../apollo/client';
import theme from '../src/styles/theme';
import createEmotionCache from '../src/styles/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // since MUI V5 still has problem with ssr, this is a temperary fix for className mismatch
  // see more on https://github.com/mui-org/material-ui/issues/27512
  const [shouldRender, setShouldRender] = useState(
    process.env.NODE_ENV === 'production'
  );
  useEffect(() => {
    setShouldRender(true);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {shouldRender && <Component {...pageProps} />}
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
App.defaultProps = {
  emotionCache: {}
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.oneOfType([PropTypes.object]),
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired
};

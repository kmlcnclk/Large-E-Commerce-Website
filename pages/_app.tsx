import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { useApollo } from 'src/apollo';
import { createWrapper } from 'next-redux-wrapper';
import configureStore from '../Store/Reducers/configure.Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-credit-cards/es/styles-compiled.css';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'src/theme';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const store = configureStore();

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

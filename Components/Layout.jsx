import Head from 'next/head';
import React from 'react';
import Navi from './navbar/Navi';
import Category from './categories/Category';
import { Container } from '@chakra-ui/layout';

function Layout({ children }) {
  return (
    <Container maxW="container.xl">
      <Head>
        <title>Large</title>
      </Head>
      <Navi />
      <Category />
      {children}
    </Container>
  );
}

export default Layout;

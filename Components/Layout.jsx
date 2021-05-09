import Head from 'next/head';
import React from 'react';
import Navi from './navbar/Navi';
import Category from './categories/Category';
// import ErrorOrSuccess from './toolbox/errorOrSuccess';

function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>Category-Product</title>
      </Head>
      <Navi />
      <Category />
      {/* <ErrorOrSuccess /> */}
      <div className="container"></div>
      {children}
    </div>
  );
}

export default Layout;

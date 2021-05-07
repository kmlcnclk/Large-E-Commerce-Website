import Head from 'next/head';
import React from 'react';
import Navi from './navbar/Navi';
import Category from './categories/Category';

function Layout({ children }) {
  return (
    <div className="container">
      <Navi />
      <Category />
      <Head>
        <title>Category-Product</title>
      </Head>
      <div className="container"></div>
      {children}
    </div>
  );
}

export default Layout;

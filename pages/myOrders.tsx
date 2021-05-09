import { useLazyQuery } from '@apollo/client';
import Layout from 'Components/Layout';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GET_MY_ORDERS } from '../GraphQL/Apollo-Client/Queries/userQuerys';
import MyOrdersComponent from 'Components/products/MyOrdersComponent';

function MyOrders() {
  const router = useRouter();

  const [orderState, setOrderState] = useState(false);

  const [getMyOrders, { data }] = useLazyQuery(GET_MY_ORDERS);

  useEffect(() => {
    router.prefetch('/');

    if (getAccessTokenFromLocal()[0]) {
      setOrderState(true);
    } else {
      router.push('/');
    }
  }, [setOrderState]);
  return (
    <Layout>
      <Head>
        <title>My Orders</title>
      </Head>
      {orderState ? (
        <MyOrdersComponent getMyOrders={getMyOrders} data={data} />
      ) : null}
    </Layout>
  );
}

export default MyOrders;

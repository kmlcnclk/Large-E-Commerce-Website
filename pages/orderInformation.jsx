import { useMutation } from '@apollo/client';
import Layout from 'Components/Layout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  ADDRESS,
  CREDITCARD,
  ORDERS,
} from 'GraphQL/Apollo-Client/Mutations/userMutations';
import { Form } from 'react-bootstrap';
import CreditCardInput from 'react-credit-card-input';
import { useRouter } from 'next/router';
import {
  addUserToLocal,
  deleteUserFromLocal,
  getUserFromLocal,
} from 'LocalStorage/userStorage';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import OrderInformationComponent from 'Components/cart/OrderInformationComponent';

function OrderInformation() {
  const router = useRouter();

  const [userAddress, { data: userAddressData }] = useMutation(ADDRESS);
  const [creditCard, { data: creditCardData }] = useMutation(CREDITCARD);
  const [orders, { data: ordersData }] = useMutation(ORDERS);

  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [infoState, setInfoState] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    if (getUserFromLocal()[0]) {
      setInfoState(true);
    } else {
      router.push('/');
    }
  }, [router, setInfoState]);

  return (
    <Layout>
      <Head>
        <title>Order Info</title>
      </Head>
      {infoState ? (
        <OrderInformationComponent
          userAddress={userAddress}
          userAddressData={userAddressData}
          creditCard={creditCard}
          creditCardData={creditCardData}
          orders={orders}
          ordersData={ordersData}
          address={address}
          setAddress={setAddress}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardExpiry={cardExpiry}
          setCardExpiry={setCardExpiry}
          cardCVC={cardCVC}
          setCardCVC={setCardCVC}
        />
      ) : null}
    </Layout>
  );
}

export default OrderInformation;

export const getStaticProps = async ({ params }) => {
  // const apolloClient = initializeApollo();

  // const { connectDatabase } = require('Server/DB/connectDatabase');

  // await connectDatabase();
  // await apolloClient.readQuery({
  //   query: SEARCH_PRODUCT,
  // });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      // revalidate: 60,
    },
  };
};

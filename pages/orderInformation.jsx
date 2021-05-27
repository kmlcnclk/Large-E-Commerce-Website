import { useLazyQuery, useMutation } from '@apollo/client';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  ADDRESS,
  CREDITCARD,
  ORDERS,
} from 'GraphQL/Apollo-Client/Mutations/userMutations';
import { useRouter } from 'next/router';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import OrderInformationComponent from 'Components/cart/OrderInformationComponent';
import { GET_SINGLE_USER } from '../GraphQL/Apollo-Client/Queries/userQuerys';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useColorMode } from '@chakra-ui/color-mode';

function OrderInformation() {
  const router = useRouter();

  const toast = useToast();
  const formBgMode = useColorModeValue('gray.100', 'gray.700');
  const { setColorMode } = useColorMode();

  const [userAddress, { data: userAddressData }] = useMutation(ADDRESS);
  const [creditCard, { data: creditCardData }] = useMutation(CREDITCARD);
  const [orders, { data: ordersData }] = useMutation(ORDERS);
  const [getSingleUser, { data: getSingleUserData }] =
    useLazyQuery(GET_SINGLE_USER);

  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');
  const [infoState, setInfoState] = useState(false);

  useEffect(() => {
    router.prefetch('/');
    setColorMode('light');
    if (getAccessTokenFromLocal()[0]) {
      const user = async () => {
        const token = await getAccessTokenFromLocal()[0];
        try {
          await getSingleUser({
            variables: {
              access_token: token ? token : '',
            },
          });
        } catch (err) {
          toast({
            title: err.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };
      user();
      setInfoState(true);
    } else {
      router.push('/');
    }
  }, [router, setInfoState, toast, setColorMode]);

  return (
    <React.Fragment>
      <Head>
        <title>Large &bull; Order Info</title>
      </Head>
      {infoState && getSingleUserData ? (
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
          getSingleUserData={getSingleUserData}
          toast={toast}
          formBgMode={formBgMode}
          cardName={cardName}
          setCardName={setCardName}
          router={router}
        />
      ) : null}
    </React.Fragment>
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

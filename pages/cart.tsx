import Layout from 'Components/Layout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import CartComponent from 'Components/cart/CartComponent';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CART } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { initializeApollo } from 'src/apollo';
import {
  ADD_TO_CART,
  FULL_REMOVE_FROM_CART,
  REMOVE_FROM_CART,
} from 'GraphQL/Apollo-Client/Mutations/userMutations';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/toast';

function Cart() {
  const router = useRouter();

  const toast = useToast();

  const [cart, setCart] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState({});

  const [userCarts, { data, loading }] = useLazyQuery(CART);
  const [addToCart, { data: addToCartData }] = useMutation(ADD_TO_CART);
  const [removeFromCart, { data: removeFromCartData }] =
    useMutation(REMOVE_FROM_CART);
  const [fullRemoveFromCart, { data: fullRemoveFromCartData }] = useMutation(
    FULL_REMOVE_FROM_CART
  );

  useEffect(() => {
    const startUserCart = async () => {
      if (getAccessTokenFromLocal()[0]) {
        const token = getAccessTokenFromLocal()[0];

        try {
          await userCarts({
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

        if (data) {
          if (data.cart.data.cart.length === 0) {
            await setCart(false);
          } else {
            await setCart(true);
            await setUserCart(data.cart.data.cart);

            await setUser(data.cart.data);
          }
        }
      } else {
        await setCart(false);
      }
    };

    startUserCart();
  }, [userCarts, data, setUser, setUserCart, setCart, toast]);

  return (
    <Layout>
      <Head>
        <title>Large &bull; Cart</title>
      </Head>
      <CartComponent
        router={router}
        cart={cart}
        user={user}
        userCart={userCart}
        data={data}
        addToCart={addToCart}
        addToCartData={addToCartData}
        removeFromCart={removeFromCart}
        removeFromCartData={removeFromCartData}
        fullRemoveFromCart={fullRemoveFromCart}
        fullRemoveFromCartData={fullRemoveFromCartData}
        setUser={setUser}
        setUserCart={setUserCart}
        toast={toast}
        loading={loading}
      />
    </Layout>
  );
}

export default Cart;

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: CART,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      revalidate: 60,
    },
  };
};

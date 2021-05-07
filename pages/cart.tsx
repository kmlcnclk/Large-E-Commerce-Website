import Layout from 'Components/Layout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import CartComponent from 'Components/cart/CartComponent';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CART } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { initializeApollo } from 'src/apollo';
import { getUserFromLocal } from 'LocalStorage/userStorage';
import {
  ADD_TO_CART,
  FULL_REMOVE_FROM_CART,
  REMOVE_FROM_CART,
} from 'GraphQL/Apollo-Client/Mutations/userMutations';
import { useRouter } from 'next/router';
import { notifyError } from 'Components/toolbox/React-Toastify';
import { ToastContainer } from 'react-toastify';

function Cart() {
  const router = useRouter();

  const [cart, setCart] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState({});

  const [userCarts, { data, error }] = useLazyQuery(CART);
  const [
    addToCart,
    { data: addToCartData, error: addToCartError },
  ] = useMutation(ADD_TO_CART);
  const [
    removeFromCart,
    { data: removeFromCartData, error: removeFromCartError },
  ] = useMutation(REMOVE_FROM_CART);
  const [
    fullRemoveFromCart,
    { data: fullRemoveFromCartData, error: fullRemoveFromCartError },
  ] = useMutation(FULL_REMOVE_FROM_CART);

  useEffect(() => {
    const startUserCart = async () => {
      if (getUserFromLocal()[0]) {
        if (getUserFromLocal()[0].cart.length === 0) {
          await setCart(false);
        } else {
          await setCart(true);

          const token = getAccessTokenFromLocal()[0];

          await userCarts({
            variables: {
              access_token: token ? token : '',
            },
          });

          if (error) {
            notifyError(error.message);
          }

          if (data) {
            await setUserCart(data.cart.data.cart);

            await setUser(data.cart.data);
          }
        }
      } else {
        await setCart(false);
      }
    };
    startUserCart();
  }, [userCarts, data, setUser, setUserCart, setCart]);

  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <CartComponent
        router={router}
        cart={cart}
        user={user}
        userCart={userCart}
        data={data}
        error={error}
        addToCart={addToCart}
        addToCartData={addToCartData}
        addToCartError={addToCartError}
        removeFromCart={removeFromCart}
        removeFromCartData={removeFromCartData}
        removeFromCartError={removeFromCartError}
        fullRemoveFromCart={fullRemoveFromCart}
        fullRemoveFromCartData={fullRemoveFromCartData}
        fullRemoveFromCartError={fullRemoveFromCartError}
        setUser={setUser}
        setUserCart={setUserCart}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
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

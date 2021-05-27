import { useLazyQuery, useMutation } from '@apollo/client';
import Layout from 'Components/Layout';
import { PROFILE } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import ProfileComponent from 'Components/auth/profile/ProfileComponent';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { useRouter } from 'next/router';
import {
  PRODUCT_DELETE,
  PRODUCT_STOCK,
} from 'GraphQL/Apollo-Client/Mutations/productMutations';
import { useToast } from '@chakra-ui/toast';
import { useDisclosure } from '@chakra-ui/hooks';
import { useColorModeValue } from '@chakra-ui/color-mode';

function Profile() {
  const router = useRouter();

  const toast = useToast();

  const { isOpen: isOpenCart, onToggle: onToggleCart } = useDisclosure();
  const { isOpen: isOpenProduct, onToggle: onToggleProduct } = useDisclosure();
  const priceColor = useColorModeValue('gray.600', 'gray.200');

  const [userCartState1, setUserCartState1] = useState(false);
  const [userCartState2, setUserCartState2] = useState(true);
  const [userProductState1, setUserProductState1] = useState(false);
  const [userProductState2, setUserProductState2] = useState(true);

  const [profile, { data, error }] = useLazyQuery(PROFILE);
  const [productDelete, { data: productDeleteData }] =
    useMutation(PRODUCT_DELETE);
  const [productStock, { data: productStockData }] = useMutation(PRODUCT_STOCK);

  useEffect(() => {
    router.prefetch('/');

    const startUserProfile = async () => {
      const token = getAccessTokenFromLocal()[0];
      await profile({
        variables: {
          access_token: token ? token : '',
        },
      });
      if (error) {
        toast({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (getAccessTokenFromLocal()[0]) {
      startUserProfile();
    } else {
      router.push('/');
    }
  }, [profile, setUserCartState2, setUserProductState2, toast]);

  return (
    <Layout>
      <Head>
        <title>Large &bull; Profile</title>
      </Head>
      {data ? (
        <ProfileComponent
          router={router}
          user={data.profile.data}
          userCartState1={userCartState1}
          setUserCartState1={setUserCartState1}
          userCartState2={userCartState2}
          setUserCartState2={setUserCartState2}
          userProductState1={userProductState1}
          setUserProductState1={setUserProductState1}
          userProductState2={userProductState2}
          setUserProductState2={setUserProductState2}
          productDelete={productDelete}
          productDeleteData={productDeleteData}
          toast={toast}
          isOpenCart={isOpenCart}
          isOpenProduct={isOpenProduct}
          onToggleCart={onToggleCart}
          onToggleProduct={onToggleProduct}
          priceColor={priceColor}
          productStock={productStock}
          productStockData={productStockData}
        />
      ) : null}
    </Layout>
  );
}

export default Profile;

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: PROFILE,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      revalidate: 60,
    },
  };
};

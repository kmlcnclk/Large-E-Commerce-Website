import { useMutation, useQuery } from '@apollo/client';
import { PRODUCT_ADD } from 'GraphQL/Apollo-Client/Mutations/productMutations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ProductAddComponent from 'Components/shop/ProductAddComponent';
import { initializeApollo } from 'src/apollo';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';

function ProductAdd() {
  const router = useRouter();

  const toast = useToast();

  const fileImages = useRef(null);

  const formBgMode = useColorModeValue('gray.100', 'gray.700');

  const [productAdd, { data }] = useMutation(PRODUCT_ADD);
  const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);

  const [userState, setUserState] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    if (getAccessTokenFromLocal()[0]) {
      setUserState(true);
    } else {
      router.push('/');
    }
  }, [router, setUserState]);

  return (
    <div>
      <Head>
        <title>Large &bull; Product Add</title>
      </Head>
      {userState && categoryData ? (
        <ProductAddComponent
          router={router}
          categoryData={categoryData}
          productAdd={productAdd}
          data={data}
          toast={toast}
          fileImages={fileImages}
          formBgMode={formBgMode}
        />
      ) : null}
    </div>
  );
}

export default ProductAdd;

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: GET_ALL_CATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      //   revalidate: 60,
    },
  };
};

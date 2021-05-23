import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { PRODUCTS_SOLD } from '../GraphQL/Apollo-Client/Queries/userQuerys';
import { getAccessTokenFromLocal } from '../LocalStorage/accessTokenStorage';
import { initializeApollo } from 'src/apollo';
import { useRouter } from 'next/dist/client/router';
import Layout from 'Components/Layout';
import Head from 'next/head';
import ProductsSoldComponent from 'Components/shop/ProductsSoldComponent';
import { POST_PRODUCTS_SOLD } from '../GraphQL/Apollo-Client/Mutations/userMutations';
import { useToast } from '@chakra-ui/toast';

function ProductsSold() {
  const router = useRouter();

  const toast = useToast();

  const [productsSold, { data }] = useLazyQuery(PRODUCTS_SOLD);
  const [postProductsSold, { data: postProductsSoldData }] =
    useMutation(POST_PRODUCTS_SOLD);

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    const productSold = async () => {
      try {
        await productsSold({
          variables: {
            access_token: await getAccessTokenFromLocal()[0],
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

    if (getAccessTokenFromLocal()[0]) {
      setAuth(true);
      productSold();
    } else {
      router.push('/');
    }
  }, [router, setAuth, productsSold]);

  return (
    <Layout>
      <Head>
        <title>Large &bull; Products Sold</title>
      </Head>
      {auth ? (
        <ProductsSoldComponent
          router={router}
          data={data}
          postProductsSold={postProductsSold}
          postProductsSoldData={postProductsSoldData}
          toast={toast}
        />
      ) : null}
    </Layout>
  );
}

export default ProductsSold;

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: PRODUCTS_SOLD,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

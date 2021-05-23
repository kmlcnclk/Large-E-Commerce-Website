import { useLazyQuery } from '@apollo/client';
import Layout from 'Components/Layout';
import { GET_MY_LIKES_PRODUCT } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import MyLikesComponent from 'Components/products/MyLikesComponent';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';

function MyLikes() {
  const router = useRouter();
  const toast = useToast();
  const priceColor = useColorModeValue('gray.600', 'gray.200');

  const [getMyLikesProduct, { data }] = useLazyQuery(GET_MY_LIKES_PRODUCT);

  const [likeProduct, setLikeProduct] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    const user = async () => {
      try {
        await getMyLikesProduct({
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
      user();
      setLikeProduct(true);
    } else {
      router.push('/');
    }
  }, [router, setLikeProduct, toast, getMyLikesProduct]);

  return (
    <Layout>
      <Head>
        <title>Large &bull; My Likes</title>
      </Head>
      {likeProduct && data ? (
        <MyLikesComponent data={data} priceColor={priceColor} />
      ) : null}
    </Layout>
  );
}

export default MyLikes;

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: GET_MY_LIKES_PRODUCT,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

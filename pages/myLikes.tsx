import { useLazyQuery } from '@apollo/client';
import Layout from 'Components/Layout';
import { GET_MY_LIKES_PRODUCT } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import MyLikesComponent from 'Components/products/MyLikesComponent';

function MyLikes() {
  const router = useRouter();

  const [getMyLikesProduct, { data }] = useLazyQuery(GET_MY_LIKES_PRODUCT);

  const [likeProduct, setLikeProduct] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    if (getAccessTokenFromLocal()[0]) {
      setLikeProduct(true);
    } else {
      router.push('/');
    }
  }, [router, setLikeProduct]);

  return (
    <Layout>
      <Head>
        <title>My Likes</title>
      </Head>
      {likeProduct ? (
        <MyLikesComponent getMyLikesProduct={getMyLikesProduct} data={data} />
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

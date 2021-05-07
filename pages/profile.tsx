import { useLazyQuery, useMutation } from '@apollo/client';
import Layout from 'Components/Layout';
import { PROFILE } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import ProfileComponent from 'Components/auth/profile/ProfileComponent';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { notifyError } from 'Components/toolbox/React-Toastify';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { PRODUCT_DELETE } from 'GraphQL/Apollo-Client/Mutations/productMutations';

function Profile() {
  const router = useRouter();

  const [userCartState1, setUserCartState1] = useState(false);
  const [userCartState2, setUserCartState2] = useState(true);
  const [userProductState1, setUserProductState1] = useState(false);
  const [userProductState2, setUserProductState2] = useState(true);

  const [profile, { data, error }] = useLazyQuery(PROFILE);
  const [productDelete, { data: productDeleteData }] = useMutation(
    PRODUCT_DELETE
  );

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
        notifyError(error.message);
      }
    };

    if (getAccessTokenFromLocal()[0]) {
      startUserProfile();
    } else {
      router.push('/');
    }
  }, [profile, notifyError, setUserCartState2, setUserProductState2]);

  return (
    <Layout>
      <Head>
        <title>Profile</title>
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
        />
      ) : null}

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

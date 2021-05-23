import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation } from '@apollo/client';
import { PROFILE_EDIT } from 'GraphQL/Apollo-Client/Mutations/userMutations';
import Head from 'next/head';
import ProfileEditComponent from 'Components/auth/profile/ProfileEditComponent';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { GET_SINGLE_USER } from 'GraphQL/Apollo-Client/Queries/userQuerys';

export default function ProfileEdit() {
  const router = useRouter();

  const toast = useToast();

  const fileImage = useRef(null);

  const formBgMode = useColorModeValue('gray.100', 'gray.700');

  const [profileEdit, { data }] = useMutation(PROFILE_EDIT);

  const [getSingleUser, { data: getSingleUserData }] =
    useLazyQuery(GET_SINGLE_USER);

  const [profileEditState, setProfileEditState] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    if (getAccessTokenFromLocal()[0]) {
      const user = async () => {
        const token = await getAccessTokenFromLocal()[0];

        try {
          await getSingleUser({
            variables: { access_token: token ? token : '' },
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
      setProfileEditState(true);
    } else {
      router.push('/');
    }
  }, [router, setProfileEditState, getSingleUser, getSingleUserData]);

  return (
    <div>
      <Head>
        <title>Large &bull; Profile Edit</title>
      </Head>
      {profileEditState && getSingleUserData ? (
        <ProfileEditComponent
          router={router}
          profileEdit={profileEdit}
          data={data}
          fileImage={fileImage}
          toast={toast}
          formBgMode={formBgMode}
          getSingleUser={getSingleUser}
          getSingleUserData={getSingleUserData}
        />
      ) : null}
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  // const apolloClient = initializeApollo();

  // const { connectDatabase } = require('Server/DB/connectDatabase');

  // await connectDatabase();
  // await apolloClient.readQuery({
  //   query: PROFILE,
  // });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      // revalidate: 60,
    },
  };
};

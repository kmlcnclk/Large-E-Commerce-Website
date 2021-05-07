import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { PROFILE_EDIT } from 'GraphQL/Apollo-Client/Mutations/userMutations';
import Head from 'next/head';
import ProfileEditComponent from 'Components/auth/profile/ProfileEditComponent';
import { getUserFromLocal } from 'LocalStorage/userStorage';

export default function ProfileEdit() {
  const router = useRouter();

  const [profileEdit, { data }] = useMutation(PROFILE_EDIT);

  const [profileEditState, setProfileEditState] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    if (getUserFromLocal()[0]) {
      setProfileEditState(true);
    } else {
      router.push('/');
    }
  }, [router, setProfileEditState]);

  return (
    <div>
      <Head>
        <title>Profile Edit</title>
      </Head>
      {profileEditState ? (
        <ProfileEditComponent
          router={router}
          profileEdit={profileEdit}
          data={data}
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

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ResetPasswordComponent from 'Components/auth/ResetPasswordComponent';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from 'GraphQL/Apollo-Client/Mutations/userMutations';

function ResetPassword() {
  const router = useRouter();

  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [resetPassword, { data }] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    router.prefetch('/login');

    const token = router.query.resetPasswordToken;
    if (token) {
      setResetPasswordToken(token);
    }
  }, [router, resetPasswordToken, setResetPasswordToken]);

  return (
    <div>
      <Head>
        <title>Reset Password</title>
      </Head>
      {resetPasswordToken ? (
        <ResetPasswordComponent
          router={router}
          resetPassword={resetPassword}
          data={data}
          resetPasswordToken={resetPasswordToken}
        />
      ) : null}
    </div>
  );
}

export default ResetPassword;

export const getStaticProps = async ({ params }) => {
  //   const apolloClient = initializeApollo();

  //   const { connectDatabase } = require('Server/DB/connectDatabase');

  //   await connectDatabase();
  //   await apolloClient.readQuery({
  //     query: CART,
  //   });

  return {
    props: {
      //   initialApolloState: apolloClient.cache.extract(),
      //   revalidate: 60,
    },
  };
};

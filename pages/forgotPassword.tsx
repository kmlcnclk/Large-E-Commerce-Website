import Head from 'next/head';
import React, { useEffect } from 'react';
import ForgotPasswordComponent from 'Components/auth/ForgotPasswordComponent';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from 'GraphQL/Apollo-Client/Mutations/userMutations';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';

function ForgotPassword() {
  const router = useRouter();

  const [forgotPassword, { data }] = useMutation(FORGOT_PASSWORD);

  const toast = useToast();

  const formBgMode = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Large &bull; Forgot Password</title>
      </Head>
      <ForgotPasswordComponent
        router={router}
        forgotPassword={forgotPassword}
        data={data}
        toast={toast}
        formBgMode={formBgMode}
      />
    </div>
  );
}

export default ForgotPassword;

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

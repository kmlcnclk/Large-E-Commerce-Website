import React, { useState } from 'react';
// import { initializeApollo } from 'src/apollo';
import { LOGIN_MUTATION } from '../GraphQL/Apollo-Client/Mutations/userMutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginComponent from '../Components/auth/LoginComponent';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const toast = useToast();

  const formBgMode = useColorModeValue('gray.100', 'gray.700');

  return (
    <React.Fragment>
      <Head>
        <title>Large &bull; Login</title>
      </Head>

      <LoginComponent
        router={router}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
        data={data}
        toast={toast}
        formBgMode={formBgMode}
      />
    </React.Fragment>
  );
}

export default Login;

export const getStaticProps = async ({}) => {
  //   const apolloClient = initializeApollo();

  //   const { connectDatabase } = require('../Server/DB/connectDatabase');

  //   await connectDatabase();

  // await apolloClient.mutation({
  //   mutation: REGISTER_MUTATION,
  // });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
    },
  };
};

import React, { useEffect, useState } from 'react';
// import { initializeApollo } from 'src/apollo';
import { LOGIN_MUTATION } from '../GraphQL/Apollo-Client/Mutations/userMutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginComponent from '../Components/auth/LoginComponent';

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data }] = useMutation(LOGIN_MUTATION);

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <LoginComponent
        router={router}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
        data={data}
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

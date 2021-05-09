import React, { useState } from 'react';
import { REGISTER_MUTATION } from '../GraphQL/Apollo-Client/Mutations/userMutations';
// import { initializeApollo } from 'src/apollo';
// import { buildUrl } from 'cloudinary-build-url';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import RegisterComponent from '../Components/auth/RegisterComponent';
import Head from 'next/head';
// import { CLOUDINARY_PROFILE_IMAGE } from '../GraphQL/Apollo-Client/Queries/userQuerys';

function Register() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageDrop, setImageDrop] = useState({});

  const [register, { data }] = useMutation(REGISTER_MUTATION);
  // const [
  //   cloudinaryProfileImage,
  //   { data: cloudinaryProfileImageData },
  // ] = useLazyQuery(CLOUDINARY_PROFILE_IMAGE);

  return (
    <React.Fragment>
      <Head>
        <title>Register</title>
      </Head>

      <RegisterComponent
        router={router}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        imageDrop={imageDrop}
        setImageDrop={setImageDrop}
        register={register}
        data={data}
        // cloudinaryProfileImage={cloudinaryProfileImage}
        // cloudinaryProfileImageData={cloudinaryProfileImageData}
      />
    </React.Fragment>
  );
}

export default Register;

export const getStaticProps = async ({}) => {
  // const apolloClient = initializeApollo();

  // const { connectDatabase } = require('../Server/DB/connectDatabase');

  // await connectDatabase();

  // await apolloClient.mutation({
  //   mutation: REGISTER_MUTATION,
  // });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
    },
  };
};

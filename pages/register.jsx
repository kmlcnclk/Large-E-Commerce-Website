import React, { useRef, useState } from 'react';
import { REGISTER_MUTATION } from '../GraphQL/Apollo-Client/Mutations/userMutations';
// import { initializeApollo } from 'src/apollo';
// import { buildUrl } from 'cloudinary-build-url';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import RegisterComponent from '../Components/auth/RegisterComponent';
import Head from 'next/head';
// import { CLOUDINARY_PROFILE_IMAGE } from '../GraphQL/Apollo-Client/Queries/userQuerys';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';

function Register() {
  const router = useRouter();

  const toast = useToast();

  const fileInput = useRef(null);

  const formBgMode = useColorModeValue('gray.100', 'gray.700');

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
        <title>Large &bull; Register</title>
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
        toast={toast}
        fileInput={fileInput}
        formBgMode={formBgMode}
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

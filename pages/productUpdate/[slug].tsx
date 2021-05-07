import { useMutation, useQuery } from '@apollo/client';
import { PRODUCT_UPDATE } from 'GraphQL/Apollo-Client/Mutations/productMutations';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import ProductUpdateComponent from 'Components/shop/ProductUpdateComponent';
import {
  GET_ALL_PRODUCT,
  PRODUCT_DETAIL,
} from 'GraphQL/Apollo-Client/Queries/productQuerys';
import { useRouter } from 'next/router';
import { getUserFromLocal } from 'LocalStorage/userStorage';

export default function ProductUpdate({ product }) {
  const router = useRouter();

  const [productUpdate, { data }] = useMutation(PRODUCT_UPDATE);
  const { data: productDetailData } = useQuery(PRODUCT_DETAIL, {
    variables: { slug: product },
  });
  const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
  const [userState, setUserState] = useState(false);

  useEffect(() => {
    router.prefetch('/');
    if (getUserFromLocal()[0]) {
      setUserState(true);
    } else {
      router.push('/');
    }
  }, [router, setUserState]);

  return (
    <div>
      <Head>
        <title>Product Update</title>
      </Head>
      {userState && productDetailData && categoryData ? (
        <ProductUpdateComponent
          router={router}
          productUpdate={productUpdate}
          data={data}
          productDetailData={productDetailData}
          categoryData={categoryData}
        />
      ) : null}
    </div>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();

  const { data } = await apolloClient.query({
    query: GET_ALL_PRODUCT,
  });

  return {
    paths: data.getAllProduct.map((product) => {
      return {
        params: { slug: product.slug },
      };
    }),
    fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: GET_ALL_CATEGORIES,
  });
  await apolloClient.readQuery({
    query: PRODUCT_DETAIL,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      product: params.slug,
      revalidate: 60,
    },
  };
};

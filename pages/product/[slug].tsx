import { useMutation, useQuery } from '@apollo/client';
import Layout from 'Components/Layout';
import {
  GET_ALL_PRODUCT,
  PRODUCT_DETAIL,
} from 'GraphQL/Apollo-Client/Queries/productQuerys';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { initializeApollo } from 'src/apollo';
import ProductDetailComponent from 'Components/products/ProductDetailComponent';
import { ADD_TO_CART } from 'GraphQL/Apollo-Client/Mutations/userMutations';
import {
  LIKE_PRODUCT,
  UNDO_LIKE_PRODUCT,
} from 'GraphQL/Apollo-Client/Mutations/productMutations';

function ProductDetail({ product }) {
  const router = useRouter();

  const [productDetail, setProductDetail] = useState({});

  const { data, error } = useQuery(PRODUCT_DETAIL, {
    variables: { slug: product },
  });

  const [
    addToCart,
    { data: addToCartData, error: addToCartError },
  ] = useMutation(ADD_TO_CART);
  const [
    likeProduct,
    { data: likeProductData, error: likeProductError },
  ] = useMutation(LIKE_PRODUCT);
  const [
    undoLikeProduct,
    { data: undoLikeProductData, error: undoLikeProductError },
  ] = useMutation(UNDO_LIKE_PRODUCT);

  return (
    <Layout>
      <Head>
        <title>
          {data ? data.getSingleProduct.data.name : 'Category-Product'}
        </title>
      </Head>
      {data ? (
        <ProductDetailComponent
          data={data.getSingleProduct.data}
          productDetail={productDetail}
          setProductDetail={setProductDetail}
          error={error}
          router={router}
          addToCart={addToCart}
          addToCartData={addToCartData}
          addToCartError={addToCartError}
          likeProduct={likeProduct}
          likeProductData={likeProductData}
          likeProductError={likeProductError}
          undoLikeProduct={undoLikeProduct}
          undoLikeProductData={undoLikeProductData}
          undoLikeProductError={undoLikeProductError}
        />
      ) : null}
    </Layout>
  );
}

export default ProductDetail;

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

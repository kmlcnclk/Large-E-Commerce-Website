import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Layout from 'Components/Layout';
import {
  GET_ALL_PRODUCT,
  PRODUCT_DETAIL,
} from 'GraphQL/Apollo-Client/Queries/productQuerys';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { initializeApollo } from 'src/apollo';
import ProductDetailComponent from 'Components/products/ProductDetailComponent';
import { ADD_TO_CART } from 'GraphQL/Apollo-Client/Mutations/userMutations';
import {
  LIKE_PRODUCT,
  UNDO_LIKE_PRODUCT,
  PRODUCT_STAR,
} from 'GraphQL/Apollo-Client/Mutations/productMutations';
import { useToast } from '@chakra-ui/toast';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { GET_SINGLE_USER } from 'GraphQL/Apollo-Client/Queries/userQuerys';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { useDisclosure } from '@chakra-ui/hooks';

function ProductDetail({ product }) {
  const router = useRouter();

  const [productDetail, setProductDetail] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const priceColor = useColorModeValue('gray.600', 'gray.300');

  const { data } = useQuery(PRODUCT_DETAIL, {
    variables: { slug: product },
  });
  const [getSingleUser, { data: getSingleUserData }] =
    useLazyQuery(GET_SINGLE_USER);

  const [addToCart, { data: addToCartData }] = useMutation(ADD_TO_CART);
  const [likeProduct, { data: likeProductData }] = useMutation(LIKE_PRODUCT);
  const [undoLikeProduct, { data: undoLikeProductData }] =
    useMutation(UNDO_LIKE_PRODUCT);
  const [productStar, { data: productStarData }] = useMutation(PRODUCT_STAR);
  const [star, setStar] = useState(0);

  useEffect(() => {
    const user = async () => {
      if (getAccessTokenFromLocal()[0]) {
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
      }
    };
    user();
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          Large &bull; {data ? data.getSingleProduct.data.name : ''}
        </title>
      </Head>
      {data ? (
        <ProductDetailComponent
          data={data.getSingleProduct.data}
          productDetail={productDetail}
          setProductDetail={setProductDetail}
          router={router}
          addToCart={addToCart}
          addToCartData={addToCartData}
          likeProduct={likeProduct}
          likeProductData={likeProductData}
          undoLikeProduct={undoLikeProduct}
          undoLikeProductData={undoLikeProductData}
          toast={toast}
          priceColor={priceColor}
          getSingleUserData={getSingleUserData}
          productStar={productStar}
          productStarData={productStarData}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setStar={setStar}
          star={star}
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

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { initializeApollo } from 'src/apollo';
import { useQuery } from '@apollo/client';
import { SEARCH_PRODUCT } from '../GraphQL/Apollo-Client/Queries/productQuerys';
import Layout from '../Components/Layout';
import Head from 'next/head';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import CustomCard from 'Components/toolbox/CustomCard';
import CustomPagination from 'Components/toolbox/CustomPagination';

function Product() {
  const router = useRouter();

  const priceColor = useColorModeValue('gray.600', 'gray.200');

  let searchProduct;
  if (router.query.search) {
    searchProduct = router.query.search;
  }

  const [pageIndex, setPageIndex] = useState(1);

  const { data } = useQuery(SEARCH_PRODUCT, {
    variables: {
      slug: searchProduct ? searchProduct : '',
      pageIndex: pageIndex,
    },
  });

  return (
    <Layout>
      <Head>
        <title>Large &bull; {router.query.search} </title>
      </Head>
      {data ? (
        <Box as="div">
          {data.searchProduct.data[0] &&
          router.query.search !== '' &&
          router.query.search !== ' ' ? (
            <Flex justify="center" direction="column" align="center">
              <SimpleGrid columns={{ md: 2, lg: 3 }} ml={2} mr={2}>
                {data.searchProduct.data.map((product) => (
                  <CustomCard
                    product={product}
                    priceColor={priceColor}
                    key={product._id}
                  />
                ))}
              </SimpleGrid>

              {data ? (
                <Box w="100%" m={3}>
                  {data.searchProduct.data[0] ? (
                    <CustomPagination
                      previous={data.searchProduct.pagination.previous}
                      next={data.searchProduct.pagination.next}
                      setPageIndex={setPageIndex}
                      pageIndex={pageIndex}
                    />
                  ) : null}
                </Box>
              ) : null}
            </Flex>
          ) : (
            <Flex justify="center" textAlign="center" mt="10" align="center">
              <Heading size="sm" fontFamily="monospace">
                The product you are looking for was not found
              </Heading>
            </Flex>
          )}
        </Box>
      ) : null}
    </Layout>
  );
}

export default Product;

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();
  await apolloClient.readQuery({
    query: SEARCH_PRODUCT,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      revalidate: 60,
    },
  };
};

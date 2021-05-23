import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { CURRENT_CATEGORY } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { initializeApollo } from 'src/apollo';
import Head from 'next/head';
import Layout from 'Components/Layout';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Collapse } from '@chakra-ui/transition';
import CustomCard from 'Components/toolbox/CustomCard';
import CustomPagination from '../../Components/toolbox/CustomPagination';

function ProductCard({ category }) {
  const filterValue = [
    { add: 'Reset', sort: '' },
    {
      add: 'Increased Liking',
      sort: 'increased-liking',
    },
    {
      add: 'Descending Liking',
      sort: 'descending-liking',
    },
    {
      add: 'Increasing Price',
      sort: 'increasing-price',
    },
    {
      add: 'Descending Price',
      sort: 'descending-price',
    },
  ];

  const [pageIndex, setPageIndex] = useState(1);
  const [sortBy, setSortBy] = useState('');

  const priceColor = useColorModeValue('gray.600', 'gray.200');
  const { isOpen, onToggle } = useDisclosure();

  const { data } = useQuery(CURRENT_CATEGORY, {
    variables: { slug: category, pageIndex: pageIndex, sortBy: sortBy },
  });

  const [currentCategory, setCurrentCategory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    if (data) {
      setCurrentCategory(data.currentCategory.data);
    }
  }, [data]);

  const addSelectedFilter = (filter) => {
    if (filter === 'Reset') {
      setSelectedFilter([]);
    } else {
      let totalFilter = [];

      totalFilter.push(filter);

      setSelectedFilter(totalFilter);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Large &bull; {category}</title>
      </Head>

      {currentCategory[0] ? (
        <Flex justify="center" direction="column" align="center" mt={4}>
          <Button
            variant="customRed"
            textAlign="center"
            onClick={onToggle}
            w="233.06px"
          >
            Filter
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <Box
              p="40px"
              color="white"
              bg="teal.500"
              rounded="md"
              shadow="md"
              mt={4}
            >
              <Box mb={4}>
                {filterValue.map((filter, i) => (
                  <Text
                    key={i}
                    p={3}
                    _hover={{ bg: 'red.500', rounded: '9' }}
                    cursor="pointer"
                    onClick={() => {
                      addSelectedFilter(filter.add);
                      setSortBy(filter.sort);
                    }}
                  >
                    {filter.add}
                  </Text>
                ))}
              </Box>

              <Box>
                {selectedFilter[0] ? (
                  <Box mt={3}>
                    {selectedFilter.map((selectFilter, index) => (
                      <Text
                        key={index}
                        cursor="no-drop"
                        p={3}
                        bg="pink.500"
                        rounded="9"
                      >
                        {selectFilter}
                      </Text>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Collapse>
        </Flex>
      ) : null}

      <Flex justify="center" direction="column" align="center">
        <SimpleGrid columns={{ md: 2, lg: 3 }} ml={2} mr={2}>
          {currentCategory.map((product) => (
            <CustomCard
              product={product}
              priceColor={priceColor}
              key={product._id}
            />
          ))}
        </SimpleGrid>

        {data ? (
          <Box w="100%" m={3}>
            {data.currentCategory.data[0] ? (
              <CustomPagination
                previous={data.currentCategory.pagination.previous}
                next={data.currentCategory.pagination.next}
                setPageIndex={setPageIndex}
                pageIndex={pageIndex}
              />
            ) : null}
          </Box>
        ) : null}
      </Flex>
    </Layout>
  );
}

export default ProductCard;

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('Server/DB/connectDatabase');

  await connectDatabase();

  const { data } = await apolloClient.query({
    query: GET_ALL_CATEGORIES,
  });

  return {
    paths: data.getCategories.map((category) => {
      return {
        params: { slug: category.slug },
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
    query: CURRENT_CATEGORY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: params.slug,
      revalidate: 60,
    },
  };
};

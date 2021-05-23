import React from 'react';
import Link from 'next/link';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
// import { initializeApollo } from 'src/apollo';
import { useQuery } from '@apollo/client';
import styles from '../../styles/Category.module.css';
import { Box, Flex } from '@chakra-ui/layout';

export default function Category({}) {
  const { data } = useQuery(GET_ALL_CATEGORIES);

  return (
    <Box className={styles.category} mt={3}>
      {data ? (
        <Flex justify="center" align="center" width="100%">
          {data.getCategories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category._id}>
              <Box
                d="inline-block"
                className={styles.categoryItem}
                justifyContent="space-between"
                alignItems="center"
                cursor="pointer"
              >
                {category.name}
              </Box>
            </Link>
          ))}
        </Flex>
      ) : null}
    </Box>
  );
}

// export const getStaticProps = async () => {
//   const apolloClient = initializeApollo();

//   const { connectDatabase } = require('Server/DB/connectDatabase');

//   await connectDatabase();

//   console.log('selam');

//   await apolloClient.query({
//     query: GET_ALL_CATEGORIES,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//       revalidate: 60,
//     },
//   };
// };

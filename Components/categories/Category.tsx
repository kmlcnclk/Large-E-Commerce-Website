import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { initializeApollo } from 'src/apollo';
import { useQuery } from '@apollo/client';
import styles from '../../styles/Category.module.css';

export default function Category({}) {
  const { data, loading } = useQuery(GET_ALL_CATEGORIES);

  // if (loading) {
  //   return (
  //     <div
  //       className={`border ${styles.category}`}
  //       style={{ borderRadius: '0.5rem' }}
  //     >
  //       <div className="nav-scroller py-1 mb-2">
  //         <nav className="nav d-flex justify-content-between">
  //           <div className="text-decoration-none text-dark">
  //             <div
  //               style={{ cursor: 'pointer' }}
  //               className="p-2 text-muted"
  //             ></div>
  //           </div>
  //         </nav>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className={`border ${styles.category}`}
      style={{ borderRadius: '0.5rem' }}
    >
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          {data.getCategories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category._id}>
              <a className="text-decoration-none text-dark">
                <div style={{ cursor: 'pointer' }} className="p-2 text-muted">
                  {category.name}
                </div>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
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

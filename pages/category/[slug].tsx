import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { CURRENT_CATEGORY } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { initializeApollo } from 'src/apollo';
import Head from 'next/head';
import styles from '../../styles/ProductCard.module.css';
import styles1 from '../../styles/Filter.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Layout from 'Components/Layout';
import { Form } from 'react-bootstrap';

function ProductCard({ category }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [sortBy, setSortBy] = useState('');

  const { data } = useQuery(CURRENT_CATEGORY, {
    variables: { slug: category, pageIndex: pageIndex, sortBy: sortBy },
  });

  const [currentCategory, setCurrentCategory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterState, setFilterState] = useState(false);

  useEffect(() => {
    if (data) {
      setCurrentCategory(data.currentCategory.data);
    }
  }, [data]);

  const addSelectedFilter = (filter) => {
    if (filter === 'reset') {
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
        <title>Current Category</title>
      </Head>
      <div className={styles.productMainCard}>
        <div className={`${styles.productCard}`}>
          {currentCategory[0] ? (
            <div style={{ textAlign: 'center' }}>
              <div
                className={`border ${styles1.filterChild1Div}`}
                style={{
                  backgroundColor: filterState ? '#fc433d' : '#f2f2f2',
                  color: filterState ? 'white' : 'black',
                }}
                onClick={() => setFilterState(!filterState)}
              >
                Filter
              </div>
              <div className="text-center">
                {filterState ? (
                  <div
                    className={`row border ${styles1.filterChild2Div}`}
                    style={{
                      backgroundColor: filterState ? '#fc433d' : '#f2f2f2',
                      color: filterState ? 'white' : 'black',
                    }}
                  >
                    <div
                      className="col-md-6"
                      style={{ marginBottom: '0.5rem' }}
                    >
                      <div
                        className={styles1.filterChild2DivChild}
                        onClick={() => {
                          addSelectedFilter('reset');
                          setSortBy('');
                        }}
                      >
                        Reset
                      </div>
                      <div
                        className={styles1.filterChild2DivChild}
                        onClick={() => {
                          addSelectedFilter('Increased Liking');
                          setSortBy('increased-liking');
                        }}
                      >
                        Increased Liking
                      </div>
                      <div
                        className={styles1.filterChild2DivChild}
                        onClick={() => {
                          addSelectedFilter('Descending Liking');
                          setSortBy('descending-liking');
                        }}
                      >
                        Descending Liking
                      </div>
                      <div
                        className={styles1.filterChild2DivChild}
                        onClick={() => {
                          addSelectedFilter('Increasing Price');
                          setSortBy('increasing-price');
                        }}
                      >
                        Increasing Price
                      </div>
                      <div
                        className={styles1.filterChild2DivChild}
                        onClick={() => {
                          addSelectedFilter('Descending Price');
                          setSortBy('descending-price');
                        }}
                      >
                        Descending Price
                      </div>
                    </div>
                    <div className="col-md-6">
                      {selectedFilter[0] ? (
                        <div>
                          {selectedFilter.map((selectFilter, index) => (
                            <div
                              key={index}
                              style={{
                                padding: '0.5rem',
                                backgroundColor: 'white',
                                borderRadius: '1rem',
                                color: 'black',
                              }}
                            >
                              <div>{selectFilter}</div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {currentCategory.map((product) => (
            <div
              className={'card ' + styles.card}
              style={{
                display: 'inline-block',
                borderRadius: '1rem',
                backgroundColor: '#f2f2f2',
              }}
              key={product._id}
            >
              <div className={`${styles.imgMarginTop}`}>
                <Image
                  src={product.imageUrl[0]}
                  width={800}
                  height={800}
                  layout="intrinsic"
                  alt={`${product.name}`}
                  priority
                  className={`img ${styles.img}`}
                />
              </div>
              <div className={'card-body ' + styles.cardBody}>
                <h5 className={'card-title ' + styles.cardTitle}>
                  <div className={styles.titleName}>{product.name}</div>
                  <br />
                  <div className={styles.price}>
                    $ {parseFloat(product.price).toFixed(2)}
                  </div>
                </h5>
                <p className={'card-title ' + styles.cardText}>
                  {product.content}
                </p>
                <Link href={`/product/${product.slug}`}>
                  <a
                    className="btn btn-block btn-primary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <strong>Go to Product</strong>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {data ? (
          <div>
            {data.currentCategory.data[0] ? (
              <div className={styles.paginationMainDiv}>
                <ul
                  className="pagination"
                  style={{ justifyContent: 'space-around' }}
                >
                  <li
                    className={`page-item ${
                      data.currentCategory.pagination.previous ? '' : 'disabled'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      data.currentCategory.pagination.previous
                        ? setPageIndex(pageIndex - 1)
                        : null;
                    }}
                  >
                    <div className={`page-link ${styles.previousBtn}`}>
                      Previous
                    </div>
                  </li>

                  <li
                    className={`page-item ${
                      data.currentCategory.pagination.next ? '' : 'disabled'
                    }`}
                    style={{ cursor: 'pointer', color: 'black' }}
                    onClick={() => {
                      data.currentCategory.pagination.next
                        ? setPageIndex(pageIndex + 1)
                        : null;
                    }}
                  >
                    <div className={`page-link ${styles.nextBtn}`}>Next</div>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
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

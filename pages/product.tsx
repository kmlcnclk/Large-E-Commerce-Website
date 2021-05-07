import React from 'react';
import { useRouter } from 'next/router';
import { initializeApollo } from 'src/apollo';
import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';
import { useQuery } from '@apollo/client';
import { SEARCH_PRODUCT } from '../GraphQL/Apollo-Client/Queries/productQuerys';
import Image from 'next/image';
import Layout from '../Components/Layout';
import Head from 'next/head';

function Product() {
  const router = useRouter();

  let searchProduct;

  if (router.query.search && router.query.search !== '') {
    searchProduct = router.query.search;
  }

  const { data } = useQuery(SEARCH_PRODUCT, {
    variables: {
      slug: searchProduct ? searchProduct : '',
    },
  });

  return (
    <Layout>
      <Head>
        <title>Search Product</title>
      </Head>
      <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <div className={`${styles.productCard} mt-1`}>
          {data
            ? data.searchProduct.data.map((product) => (
                <div
                  className={`card ${styles.card}`}
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
                      className={`img ${styles.img}`}
                      alt={`${product.name}`}
                      priority
                    />
                  </div>

                  <div className={'card-body ' + styles.cardBody}>
                    <h5 className={'card-title ' + styles.cardBody}>
                      <div className={styles.titleName}>{product.name}</div>
                      <br />
                      <div className={styles.price}>$ {product.price}</div>
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
              ))
            : null}
        </div>
      </div>
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

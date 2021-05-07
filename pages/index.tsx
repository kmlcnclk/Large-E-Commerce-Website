import Head from 'next/head';
import Layout from 'Components/Layout';
import styles from '../styles/Home.module.css';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { initializeApollo } from 'src/apollo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home({}) {
  const router = useRouter();

  const { data } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    router.prefetch('/category/[slug]');
  }, [router]);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.homePageFirstDiv}>
          <div style={{ textAlign: 'center' }}>
            <Carousel
              indicators={false}
              nextIcon={<GoChevronRight className={styles.carouselIcon} />}
              prevIcon={<GoChevronLeft className={styles.carouselIcon} />}
            >
              <Carousel.Item>
                <div className={styles.homePageMainCategory}>
                  <Link href="/category/electronic">
                    <a style={{ cursor: 'pointer' }}>
                      <Image
                        className={`d-block w-100 ${styles.carouselImage}`}
                        src="/electronic1.png"
                        height={500}
                        width={1100}
                        alt="First slide"
                      />
                    </a>
                  </Link>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className={styles.homePageMainCategory}>
                  <Image
                    className={`d-block w-100 ${styles.carouselImage}`}
                    src="/electronic2.jpg"
                    height={500}
                    width={1100}
                    alt="First slide"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className={styles.homePageMainCategory}>
                  <Image
                    className={`d-block w-100 ${styles.carouselImage}`}
                    src="/electronic3.jpg"
                    height={500}
                    width={1100}
                    alt="First slide"
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        {data ? (
          <div className={styles.homePageSecondDiv}>
            {data.getCategories.map((category) => (
              <div className={`card mb-3 ${styles.card}`} key={category._id}>
                <div className={styles.homePageCategoryCardMainImage}>
                  <Image
                    width={400}
                    height={500}
                    src={`/${category.imageUrl}`}
                    className={`${styles.homePageCategoryCardImage}`}
                    alt={`${category.name} Image`}
                  />
                </div>
                <div className={styles.homePageLinkName}>
                  <Link href={`/category/${category.slug}`}>
                    <a className={styles.homePageA}>
                      <strong>{category.name}</strong>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({}) => {
  const apolloClient = initializeApollo();

  const { connectDatabase } = require('../Server/DB/connectDatabase');

  await connectDatabase();

  await apolloClient.readQuery({
    query: GET_ALL_CATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

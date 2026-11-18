
import Link from 'next/link';
import Date from '../components/date';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedList } from '../lib/data';

export async function getStaticProps() {
  const allPostsData = await getSortedList();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${styles.card}`}>
        <p>Welcome to my movie collection!</p>
        <p>
          Here you can explore some of my favorite movies and learn
          more about their genres, release years, and ratings.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${styles.blogSection}`}>
        <h2 className={utilStyles.headingLg}>Movies</h2>

        <ul className={utilStyles.list}>
          {allPostsData.map(
            ({ id, date, title, genre, releaseYear, rating }) => (
              <li
                className={`${utilStyles.listItem} ${styles.postItem}`}
                key={id}
              >
                <Link href={`/posts/${id}`} className={styles.postLink}>
                  {title}
                </Link>

                <br />

                <small className={utilStyles.lightText}>
                  Genre: {genre} | Released: {releaseYear} | Rating: {rating}/10
                </small>

                <br />

                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}

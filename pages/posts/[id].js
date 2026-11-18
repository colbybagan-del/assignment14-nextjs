
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from '../../styles/Post.module.css';

import { getAllIds, getData } from '../../lib/data';

export async function getStaticPaths() {
  const paths = await getAllIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className={styles.post}>
        <h1 className={`${utilStyles.headingXl} ${styles.title}`}>
          {postData.title}
        </h1>

        <div className={`${utilStyles.lightText} ${styles.date}`}>
          <Date dateString={postData.date} />
        </div>

        <div className={styles.content}>
          <p><strong>Genre:</strong> {postData.genre}</p>
          <p><strong>Release Year:</strong> {postData.releaseYear}</p>
          <p><strong>Rating:</strong> {postData.rating}/10</p>

          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </article>
    </Layout>
  );
}


import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from '../../styles/Post.module.css';

const apiUrl =
  'https://dev-assignment11sql.pantheonsite.io/wp-json/twentytwentyfive-child/v1/books';

export async function getStaticPaths() {
  const response = await fetch(apiUrl);
  const books = await response.json();

  const paths = books.map((book) => ({
    params: {
      id: String(book.ID),
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(apiUrl);
  const books = await response.json();

  const book = books.find(
    (item) => String(item.ID) === params.id
  );

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
    revalidate: 60,
  };
}

export default function Book({ book }) {
  return (
    <Layout>
      <Head>
        <title>{book.post_title}</title>
      </Head>

      <article className={styles.post}>
        <h1 className={`${utilStyles.headingXl} ${styles.title}`}>
          {book.post_title}
        </h1>

        <div className={styles.content}>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Publication Year:</strong> {book.publication_year}</p>
          <p><strong>Rating:</strong> {book.rating}/10</p>
          <p><strong>Author:</strong> {book.author}</p>

          <div
            dangerouslySetInnerHTML={{
              __html: book.post_content,
            }}
          />
        </div>
      </article>
    </Layout>
  );
}

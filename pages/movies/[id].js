
import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from '../../styles/Post.module.css';

const apiUrl =
  'https://dev-assignment11sql.pantheonsite.io/wp-json/twentytwentyfive-child/v1/movies';

export async function getStaticPaths() {
  const response = await fetch(apiUrl);
  const movies = await response.json();

  const paths = movies.map((movie) => ({
    params: {
      id: String(movie.ID),
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(apiUrl);
  const movies = await response.json();

  const movie = movies.find(
    (item) => String(item.ID) === params.id
  );

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
    revalidate: 60,
  };
}

export default function Movie({ movie }) {
  return (
    <Layout>
      <Head>
        <title>{movie.post_title}</title>
      </Head>

      <article className={styles.post}>
        <h1 className={`${utilStyles.headingXl} ${styles.title}`}>
          {movie.post_title}
        </h1>

        <div className={styles.content}>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.release_year}</p>
          <p><strong>Rating:</strong> {movie.rating}/10</p>
          <p><strong>Director:</strong> {movie.director}</p>

          <div
            dangerouslySetInnerHTML={{
              __html: movie.post_content,
            }}
          />
        </div>
      </article>
    </Layout>
  );
}

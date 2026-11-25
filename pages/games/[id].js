
import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from '../../styles/Post.module.css';

const apiUrl =
  'https://dev-assignment11sql.pantheonsite.io/wp-json/twentytwentyfive-child/v1/games';

export async function getStaticPaths() {
  const response = await fetch(apiUrl);
  const games = await response.json();

  const paths = games.map((game) => ({
    params: {
      id: String(game.ID),
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(apiUrl);
  const games = await response.json();

  const game = games.find(
    (item) => String(item.ID) === params.id
  );

  if (!game) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      game,
    },
    revalidate: 60,
  };
}

export default function Game({ game }) {
  return (
    <Layout>
      <Head>
        <title>{game.post_title}</title>
      </Head>

      <article className={styles.post}>
        <h1 className={`${utilStyles.headingXl} ${styles.title}`}>
          {game.post_title}
        </h1>

        <div className={styles.content}>
          <p><strong>Genre:</strong> {game.genre}</p>
          <p><strong>Release Year:</strong> {game.release_year}</p>
          <p><strong>Rating:</strong> {game.rating}/10</p>
          <p><strong>Developer:</strong> {game.developer}</p>

          <div
            dangerouslySetInnerHTML={{
              __html: game.post_content,
            }}
          />
        </div>
      </article>
    </Layout>
  );
}

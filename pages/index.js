
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

const wordpressUrl =
  'https://dev-assignment11sql.pantheonsite.io/wp-json/twentytwentyfive-child/v1';

export async function getStaticProps() {
  const [moviesResponse, gamesResponse, booksResponse] = await Promise.all([
    fetch(`${wordpressUrl}/movies`),
    fetch(`${wordpressUrl}/games`),
    fetch(`${wordpressUrl}/books`),
  ]);

  if (
    !moviesResponse.ok ||
    !gamesResponse.ok ||
    !booksResponse.ok
  ) {
    throw new Error('Failed to fetch WordPress content');
  }

  const movies = await moviesResponse.json();
  const games = await gamesResponse.json();
  const books = await booksResponse.json();

  return {
    props: {
      movies,
      games,
      books,
    },
    revalidate: 60,
  };
}

export default function Home({ movies, games, books }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${styles.card}`}>
        <p>Welcome to my entertainment collection!</p>
        <p>
          Explore my favorite movies, video games, and books.
          Select any title to learn more about it.
        </p>
      </section>

      {/* Movies list */}
      <section className={`${utilStyles.headingMd} ${styles.blogSection}`}>
        <h2 className={utilStyles.headingLg}>Movies</h2>

        <ul className={utilStyles.list}>
          {movies.map((movie) => (
            <li
              className={`${utilStyles.listItem} ${styles.postItem}`}
              key={movie.ID}
            >
              <Link
                href={`/movies/${movie.ID}`}
                className={styles.postLink}
              >
                {movie.post_title}
              </Link>

              <br />

              <small className={utilStyles.lightText}>
                Genre: {movie.genre} | Released: {movie.release_year} |
                Rating: {movie.rating}/10
              </small>
            </li>
          ))}
        </ul>
      </section>

      {/* Games list */}
      <section className={`${utilStyles.headingMd} ${styles.blogSection}`}>
        <h2 className={utilStyles.headingLg}>Games</h2>

        <ul className={utilStyles.list}>
          {games.map((game) => (
            <li
              className={`${utilStyles.listItem} ${styles.postItem}`}
              key={game.ID}
            >
              <Link
                href={`/games/${game.ID}`}
                className={styles.postLink}
              >
                {game.post_title}
              </Link>

              <br />

              <small className={utilStyles.lightText}>
                Genre: {game.genre} | Released: {game.release_year} |
                Rating: {game.rating}/10
              </small>
            </li>
          ))}
        </ul>
      </section>

      {/* Books list */}
      <section className={`${utilStyles.headingMd} ${styles.blogSection}`}>
        <h2 className={utilStyles.headingLg}>Books</h2>

        <ul className={utilStyles.list}>
          {books.map((book) => (
            <li
              className={`${utilStyles.listItem} ${styles.postItem}`}
              key={book.ID}
            >
              <Link
                href={`/books/${book.ID}`}
                className={styles.postLink}
              >
                {book.post_title}
              </Link>

              <br />

              <small className={utilStyles.lightText}>
                Genre: {book.genre} | Published: {book.publication_year} |
                Rating: {book.rating}/10
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

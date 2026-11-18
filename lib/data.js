import got from 'got';

const apiUrl =
  'https://dev-assignment11sql.pantheonsite.io/wp-json/wp/v2/movies';

async function getPosts() {
  return await got(apiUrl).json();
}

export async function getAllIds() {
  const posts = await getPosts();

  return posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
}

export async function getSortedList() {
  const posts = await getPosts();

  const allPostsData = posts.map((post) => ({
    id: String(post.id),
    date: post.date,
    title: post.title.rendered,
    genre: post.acf.genre,
    releaseYear: post.acf.release_year,
    rating: post.acf.rating,
  }));

  return allPostsData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

export async function getData(id) {
  const posts = await getPosts();

  const post = posts.find(
    (item) => String(item.id) === String(id)
  );

  if (!post) {
    throw new Error(`Movie with ID ${id} was not found.`);
  }

  return {
    id: String(post.id),
    date: post.date,
    title: post.title.rendered,
    contentHtml: post.content.rendered,
    genre: post.acf.genre,
    releaseYear: post.acf.release_year,
    rating: post.acf.rating,
  };
}
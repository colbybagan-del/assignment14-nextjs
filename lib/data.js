
import got from 'got';

const apiUrl =
  'https://dev-assignment11sql.pantheonsite.io/wp-json/twentytwentyfive-child/v1/latest-posts/1';

async function getPosts() {
  return await got(apiUrl).json();
}

export async function getAllIds() {
  const posts = await getPosts();

  return posts.map((post) => ({
    params: {
      id: String(post.ID),
    },
  }));
}

export async function getSortedList() {
  const posts = await getPosts();

  const allPostsData = posts.map((post) => ({
    id: String(post.ID),
    date: post.post_date.replace(' ', 'T'),
    title: post.post_title,
  }));

  return allPostsData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

export async function getData(id) {
  const posts = await getPosts();

  const post = posts.find(
    (item) => String(item.ID) === String(id)
  );

  if (!post) {
    throw new Error(`Post with ID ${id} was not found.`);
  }

  return {
    id: String(post.ID),
    date: post.post_date.replace(' ', 'T'),
    title: post.post_title,
    contentHtml: post.post_content,
  };
}

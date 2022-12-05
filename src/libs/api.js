const NEWS_DOMAIN = "https://hacker-news.firebaseio.com/v0/";

export async function getNews(newsId) {
  // console.log(newsId)
  const response = await fetch(`${NEWS_DOMAIN}/item/${newsId}.json`);
  const data = await response.json();

  // console.log(data)

  if (!response.ok) {
    throw new Error(data.message || "Cant fetch news data");
  }

  return data;
}

export async function getCommentsIds(newsId) {
  const response = await fetch(
    `${NEWS_DOMAIN}/item/${newsId}.json?print=pretty`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Cant fetch news comment");
  }

  return data;
}

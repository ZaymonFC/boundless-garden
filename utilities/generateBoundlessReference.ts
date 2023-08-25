import { postSummaries } from "../data/Meta";

//** Given the reference or post-id generate a post reference data blob */
const generateBoundlessReference = (urlOrId: string) => {
  if (!urlOrId) return;

  const post = postSummaries.find((p) => p.url === urlOrId || p.meta.id === urlOrId);

  console.assert(
    !!post,
    "Could not find post to reference",
    urlOrId,
    postSummaries.map((p) => p.url)
  );
  if (!post) return;

  const meta = post.meta;

  return {
    [post.url]: {
      author: meta.author,
      title: meta.title,
      year: meta.date.getFullYear(),
      url: `https://www.boundless.garden/${post.url}`,
      publisher: "Boundless Garden",
    },
  };
};

export default generateBoundlessReference;

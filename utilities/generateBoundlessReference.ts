import { postSummaries } from "../data/Meta";

//** Given the reference or post-id generate a post reference data blob */
const generateBoundlessReference = (url?: string, id?: string) => {
  console.assert(
    !(url || id),
    "Must supply a url reference or id to generate a boundless reference"
  );

  if (!url && !id) return;

  const post = postSummaries.find((p) => (url && p.url === url) || (id && p.meta.id === id));

  console.assert(
    !!post,
    "Could not find post to reference",
    url,
    postSummaries.map((p) => p.url)
  );
  if (!post) return;

  const meta = post.meta;

  return {
    [(url || id) as string]: {
      author: meta.author,
      title: meta.title,
      year: meta.date.getFullYear(),
      url: `https://www.boundless.garden/${url}`,
      publisher: "Boundless Garden",
    },
  };
};

export default generateBoundlessReference;

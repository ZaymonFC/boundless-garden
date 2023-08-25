import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

type Data = { claps?: number };

// --- KV Store Helpers -------------------------------------------------------
const getClapsForPost = async (postId: string) => {
  const claps = await kv.get<number>("claps-" + postId);

  if (claps === null) {
    await kv.set("claps-" + postId, 0);
  }

  return claps || 0;
};

const incrementClapsForPost = async (postId: string, clapsDiff: number) => {
  await kv.incrby("claps-" + postId, clapsDiff);
};

// --- API Handler ------------------------------------------------------------
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const postId = req.query.postId as string;

  console.log("postId", req.query);

  if (req.method === "GET") {
    const claps = await getClapsForPost(postId);
    console.log(claps);
    return res.status(200).json({ claps });
  }

  if (req.method === "POST") {
    if (!req.body.clapsDiff) return res.status(400).end();

    const clapsDiff: number = req.body.clapsDiff;
    await incrementClapsForPost(postId, clapsDiff);
    return res.status(200).end();
  }

  // Handle other HTTP methods or provide an error response
  res.status(405).end();
}

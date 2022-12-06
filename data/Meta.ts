import { dec, inc } from "../utilities/Prelude";

export type PostMeta = {
  id: string;
  title: string;
  date: Date;
  author: string;
  wordCount: number;
  tags: string[];
  series?: string;
  private?: boolean;
};

const Meta: { [url: string]: PostMeta } = {
  intro: {
    id: "01",
    title: "Intro—interlude",
    date: new Date("2021-08"),
    author: "Zan",
    wordCount: 240,
    tags: ["beginnings"],
  },

  "momentum-1": {
    id: "487be66f-5714-4490-80a4-9cbecc93d750",
    title: "Momentum 1",
    date: new Date("2021-10"),
    author: "Zan",
    wordCount: 600,
    series: "⩥ Momentum",
    tags: ["virtuous cycles", "motivation", "productivity"],
  },

  "book-report/breakfast-of-champions": {
    id: "d8b6c66a-ea2f-429d-81c7-8dcdec84f7fb",
    title: "Breakfast of Champions",
    date: new Date("2021-10"),
    author: "Zan",
    wordCount: 1100,
    series: "📖 Book Report",
    tags: ["Kurt Vonnegut"],
    private: true,
  },

  "bytes/on-play": {
    id: "40BDC5DF-CE8A-45FD-9B53-9408607C88AD",
    title: "On play",
    date: new Date("2022-02"),
    author: "Zan",
    wordCount: 520,
    series: "⟐ Bytes",
    tags: ["play", "neuroscience", "meta"],
  },

  "bytes/on-courage": {
    id: "126b1704-e798-4671-a515-ed4918d5bfda",
    title: "On Courage",
    date: new Date("2022-03-27"),
    author: "Zan",
    wordCount: 520,
    series: "⟐ Bytes",
    tags: ["courage", "awareness", "over-correction"],
  },

  "conventional-wisdom": {
    id: "3c7df420-ec74-4014-99d8-cbbb8bd5a5bc",
    title: "Conventional Wisdom",
    date: new Date("2022-07-12"),
    author: "Zan",
    wordCount: 800,
    tags: ["wisdom", "path-finding", "alternative lifestyle"],
  },

  constraints: {
    id: "48a6105b-d38e-43ee-8180-02e6d96d659c",
    title: "Constraints",
    date: new Date("2022-11-18"),
    author: "Zan",
    wordCount: 500,
    tags: ["writing", "constraints", "creativity", "structure"],
  },

  "the-last-time": {
    id: "d96f2596-c205-4403-8456-8a2da2822088",
    title: "The Last Time?",
    date: new Date("2022-11-28"),
    author: "Zan",
    wordCount: 550,
    tags: ["openness", "receptivity", "nature", 'path-finding'],
  },
};

type PostSummary = { url: string; meta: PostMeta };

export const postSummaries: PostSummary[] = Object.entries(Meta).map(([url, meta]) => ({
  url,
  meta,
}));

const matcher =
  (id: string) =>
  ({ meta }: PostSummary) =>
    id === meta.id;

const next =
  <T>(arr: T[], idx: number) =>
  () =>
    arr[inc(idx)];

const previous =
  <T>(arr: T[], idx: number) =>
  () =>
    arr[dec(idx)];

export const surroundingPosts = (id: string): { next?: PostSummary; previous?: PostSummary } => {
  const length = postSummaries.length;
  const idx = postSummaries.findIndex(matcher(id));
  const [nextPost, previousPost] = [next(postSummaries, idx), previous(postSummaries, idx)];

  if (idx === length - 1) return { previous: previousPost() };
  if (idx === 0) return { next: nextPost() };
  return { next: nextPost(), previous: previousPost() };
};

export default Meta;

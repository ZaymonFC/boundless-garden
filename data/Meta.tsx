export type PostMeta = {
  id: string;
  title: string;
  date: Date;
  author: string;
  wordCount: number;
  tags: string[];
  series?: string;
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
};

export default Meta;

import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import React from "react";
import { StarBackground } from "../components/Background";
import Nav from "../components/Nav";
import { styled } from "../Stitches";
import Meta, { PostMeta } from "../data/Meta";
import { format } from "date-fns";
import Link from "next/link";
import { Fade } from "../components/Fade";

const IndexContainer = styled("div", {
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: 12,
  padding: 24,

  maxWidth: 1264,
});

const PostTileContainer = styled("a", {
  padding: 16,
  border: "solid 1px $salmon",
  borderRadius: "$2",

  minWidth: 308,

  transitionProperty: "border, padding, box-shadow, z-index",
  transitionTimingFunction: "cubic, cubic, ease-out, ease-out",
  transitionDuration: "400ms, 400ms, 200ms, 100ms",

  "&:hover": {
    cursor: "pointer",

    border: "solid 4px $salmon",
    padding: 13, // Offset border growth with padding reduction

    boxShadow: "0 0 0 100000px rgba(0, 0, 0, 0.4)",
    zIndex: 9999,
  },

  "&:active": { transform: "scale(0.98)" },
});

const PostTileHeader = styled("h2", {
  display: "inline-block",
  padding: 0,
  margin: 0,
  marginRight: 4,

  color: "$salmon",

  fontFamily: "Cardo",
  fontSize: "$5",
});

const PostTileSeries = styled("span", {
  padding: "1px 4px",
  verticalAlign: "top",

  color: "$salmon",

  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$salmon",
  borderRadius: 3,

  fontFamily: "Jetbrains Mono",
  fontSize: "0.8rem",
  wordSpacing: "-6px",
  whiteSpace: "nowrap",
});

const PostTagList = styled("div", {
  margin: 0,
  padding: 0,
  marginTop: 6,
  color: "$yellow",

  fontFamily: "Jetbrains Mono",

  "> *": {
    display: "inline-block",
    marginRight: 4,
    marginBottom: 4,
  },
});

const PostTileTag = styled("span", {
  display: "inline-block",
  paddingBlock: 1,
  paddingInline: 2,

  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$yellow",
  borderRadius: 3,

  fontFamily: "Jetbrains Mono",
  fontSize: "0.9em",

  cursor: "pointer",

  transitionProperty: "all",
  transitionDuration: "200ms",

  "&:hover": {
    color: "$salmon",
    borderColor: "$salmon",
    transform: "scale(1.03)",
  },

  "&:active": { transform: "scale(0.9)" },
});

const tagIconStyles = {
  marginRight: 2,
  position: "relative",
  top: 2,
};

const TagCalendarIcon = styled(CalendarIcon, tagIconStyles);
const TagAuthorIcon = styled(PersonIcon, tagIconStyles);

type TagType = "author" | "date";

const labels = {
  author: <TagAuthorIcon />,
  date: <TagCalendarIcon />,
};

// TODO: Eat on click and don't propagate!
type PostTileTagProps = { type?: TagType; children: React.ReactNode };
const PostTileTagWithLabel = ({ type, children }: PostTileTagProps) => {
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <PostTileTag onClick={onClick}>
      {type && <>{labels[type]}</>}
      {children}
    </PostTileTag>
  );
};

type PostTileProps = {
  url: string;
  title: string;
  author: string;
  date: Date;
  series?: string;
  tags?: string[];
};

const PostTile = ({ url, title, author, date, series, tags }: PostTileProps) => {
  return (
    <Link href={url} passHref>
      <PostTileContainer>
        <div>
          <PostTileHeader>{title}</PostTileHeader>
          {series && <PostTileSeries>{series}</PostTileSeries>}
        </div>
        <PostTagList>
          <PostTileTagWithLabel type="date">{format(date, "MMMM yyyy")}</PostTileTagWithLabel>
          <PostTileTagWithLabel type="author">{author}</PostTileTagWithLabel>
          {tags?.map((tag, idx) => (
            <PostTileTagWithLabel key={idx}>{tag}</PostTileTagWithLabel>
          ))}
        </PostTagList>
      </PostTileContainer>
    </Link>
  );
};

const PostGridContainer = styled("div", {
  display: "grid",

  gridTemplateRows: "auto 1fr",
  // gridGap: "24px",

  variants: {
    columns: {
      single: { gridTemplateColumns: "repeat(1, 1fr)", gridGap: "16px" },
      double: { gridTemplateColumns: "repeat(2, 1fr)", gridGap: "16px" },
      triple: { gridTemplateColumns: "repeat(3, 1fr)", gridGap: "24px" },
    },
  },
});

const metaToPostTile = (url: string, meta: PostMeta) => {
  return (
    <PostTile
      key={url}
      url={url}
      title={meta.title}
      date={meta.date}
      author={meta.author}
      series={meta.series}
      tags={meta.tags}
    />
  );
};

const Page = () => (
  <>
    <Head>
      <title>Boundless.Garden - All posts</title>
      <meta name="description" content="Step into the boundless garden" />
    </Head>
    <StarBackground />
    <Nav />
    <Fade>
      <IndexContainer>
        <h1>All Posts</h1>
        <PostGridContainer columns={{ "@initial": "single", "@bp2": "double", "@bp3": "triple" }}>
          {Object.entries(Meta)
            .reverse()
            .map(([url, meta]) => metaToPostTile(url, meta))}
        </PostGridContainer>
      </IndexContainer>
    </Fade>
  </>
);

// TODO: Do something about tags wrapping when expanding on hover

export default Page;

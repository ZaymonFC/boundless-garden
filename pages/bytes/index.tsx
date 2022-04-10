import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import React from "react";
import { StarBackground } from "../../components/Background";
import Nav from "../../components/Nav";
import { styled } from "../../Stitches";

const IndexContainer = styled("div", {
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: 12,
  padding: 24,

  maxWidth: 1264,
});

const PostTileContainer = styled("div", {
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
    padding: 13,

    boxShadow: "0 0 0 100000px rgba(0, 0, 0, 0.4)",
    zIndex: 9999,
  },
  "&:active": {
    transform: "scale(1)",
  },
});

const PostTileHeader = styled("h2", {
  display: "inline-block",
  padding: 0,
  margin: 0,

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
});

const PostTagList = styled("div", {
  margin: 0,
  padding: 0,
  color: "$yellow",

  fontFamily: "Jetbrains Mono",

  "> *": {
    display: "inline-block",
    marginRight: 4,
    marginBottom: 4,
  },
});

// Box shadow that animates all the way into the middle on hover (post tile)

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
    paddingInline: 8,
  },
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

type PostTileTagProps = { type?: TagType; children: React.ReactNode };
const PostTileTagWithLabel = ({ type, children }: PostTileTagProps) => {
  return (
    <PostTileTag>
      {type && <>{labels[type]}</>}
      {children}
    </PostTileTag>
  );
};

type PostTileProps = { title: string; author: string; series?: string; tags?: string[] };

const PostTile = ({ title, author, series, tags }: PostTileProps) => {
  return (
    <PostTileContainer>
      <div>
        <PostTileHeader>{title}</PostTileHeader>
        {series && <PostTileSeries>{series}</PostTileSeries>}
      </div>
      <PostTagList>
        <PostTileTagWithLabel type="date">October 2021</PostTileTagWithLabel>
        <PostTileTagWithLabel type="author">{author}</PostTileTagWithLabel>
        {tags?.map((s, idx) => (
          <PostTileTagWithLabel type="author" key={idx}>
            {s}
          </PostTileTagWithLabel>
        ))}
      </PostTagList>
    </PostTileContainer>
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
      triple: { gridTemplateColumns: "repeat(3, 1fr)", gridGap: "32px" },
    },
  },
});

const Page = () => (
  <>
    <Head>
      <title>Boundless.Garden - All posts</title>
      <meta name="description" content="Step into the boundless garden" />
    </Head>
    <StarBackground />
    <Nav />
    <IndexContainer>
      <h1>All Posts</h1>
      <PostGridContainer columns={{ "@initial": "single", "@bp2": "double", "@bp3": "triple" }}>
        <PostTile title="Momentum 1" author="Zan" series="⩥ Momentum" tags={["tag 2", "tag 3"]} />
        <PostTile
          title="Momentum 1"
          author="Zan"
          series="Bytes"
          tags={["tag 2", "tag 3", "tag 4", "tag 5"]}
        />
        <PostTile title="Momentum 1" author="Zan" series="Bytes" tags={["tag 2", "tag 3"]} />
        <PostTile title="Momentum 1" author="Zan" series="Bytes" tags={["tag 2", "tag 3"]} />
        <PostTile title="Momentum 1" author="Zan" series="Bytes" tags={["tag 2", "tag 3"]} />
        <PostTile title="Momentum 1" author="Zan" series="Bytes" tags={["tag 2", "tag 3"]} />
        <PostTile title="Momentum 1" author="Zan" series="Bytes" tags={["tag 2", "tag 3"]} />
      </PostGridContainer>
    </IndexContainer>
  </>
);

export default Page;

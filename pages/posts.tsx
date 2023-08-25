import { CalendarIcon, Cross2Icon, PersonIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Button } from "../components/Button";
import { Fade } from "../components/Fade";
import Nav from "../components/Nav";
import { VSpacer } from "../components/Spacers";
import { StarBackground } from "../components/StarBackground";
import { PostMeta } from "../data/Meta";
import { formatTagDate, Tag, useFilteredPostsByTags, useTag, useTags } from "../hooks/tags";
import { styled } from "../Stitches";

const IndexContainer = styled("div", {
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: 12,
  padding: 24,

  maxWidth: 1264,
});

const PostTileContainer = styled("a", {
  padding: 12,
  border: "solid 1px $salmon",
  borderRadius: "$4",

  minWidth: 308,

  transitionProperty: "border, padding, box-shadow, z-index",
  transitionTimingFunction: "cubic, cubic, ease-out, cubic",
  transitionDuration: "100ms, 100ms, 200ms, 50ms",

  "&:active": { transform: "scale(0.98)" },

  backdropFilter: "blur(1px)",

  variants: {
    hoverable: {
      true: {
        "&:hover": {
          cursor: "pointer",

          border: "solid 2px $salmon",
          padding: 11, // Offset border growth with padding reduction

          boxShadow: "0 0 0 100000px rgba(0, 0, 0, 0.2)",
          zIndex: 999,

          transform: "scale(1.01)",
        },
      },
    },
  },
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

const PostTileTagContainer = styled("span", {
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
  transitionDuration: "120ms",

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

const CrossIcon = styled(Cross2Icon, {
  marginLeft: 2,
  position: "relative",
  top: 2,
  "&:hover": { transform: "scale(1.1)" },
});

const TagCalendarIcon = styled(CalendarIcon, tagIconStyles);
const TagAuthorIcon = styled(PersonIcon, tagIconStyles);

const labels = {
  author: <TagAuthorIcon />,
  date: <TagCalendarIcon />,
};

const PostTileTagInner = ({ tag: { type, tag } }: { tag: Tag }) => {
  return (
    <>
      {type && <>{labels[type]}</>}
      {tag}
    </>
  );
};

const PostTileTagWithLabel = ({ tag, removable }: { tag: Tag; removable?: boolean }) => {
  const { addTag, removeTag } = useTag(tag);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (removable) return;
    event.stopPropagation();
    event.preventDefault();

    addTag();
  };

  return (
    <PostTileTagContainer onClick={onClick}>
      <PostTileTagInner tag={tag} />
      {removable && <CrossIcon onClick={removeTag} />}
    </PostTileTagContainer>
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

export const PostTile = ({ url, title, author, date, series, tags }: PostTileProps) => (
  <Link href={url} passHref>
    <PostTileContainer hoverable={{ "@initial": false, "@bp1": true }}>
      <div>
        <PostTileHeader>{title}</PostTileHeader>
        {series && <PostTileSeries>{series}</PostTileSeries>}
      </div>
      <PostTagList>
        <PostTileTagWithLabel tag={{ type: "date", tag: formatTagDate(date) }} />
        <PostTileTagWithLabel tag={{ type: "author", tag: author }} />
        {tags?.map((tag, idx) => (
          <PostTileTagWithLabel key={idx} tag={{ tag }} />
        ))}
      </PostTagList>
    </PostTileContainer>
  </Link>
);

export const PostGridContainer = styled("div", {
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

export const metaToPostTile = (url: string, meta: PostMeta) => {
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

const FilterTags = () => {
  const { tags, clear } = useTags();

  return (
    <div>
      <PostTagList>
        {tags.map((tag, idx) => (
          <PostTileTagWithLabel key={idx} tag={tag} removable />
        ))}
      </PostTagList>
      {tags.length > 0 && (
        <>
          <Button size="sm" onClick={clear}>
            Clear
          </Button>
          <VSpacer />
        </>
      )}
    </div>
  );
};

function Page() {
  const posts = useFilteredPostsByTags();

  return (
    <>
      <Head>
        <title>Boundless.Garden - All posts</title>
        <meta name="description" content="Step into the boundless garden" />
      </Head>
      <StarBackground height="full" />
      <Nav />
      <Fade>
        <IndexContainer>
          <h1>All Posts</h1>
          <FilterTags />
          <PostGridContainer columns={{ "@initial": "single", "@bp2": "double", "@bp3": "triple" }}>
            {posts.map(([url, meta]) => metaToPostTile(url, meta))}
          </PostGridContainer>
        </IndexContainer>
      </Fade>
    </>
  );
}

// TODO: Do something about tags wrapping when expanding on hover

export default Page;

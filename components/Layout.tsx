import { css, cx } from "@emotion/css";
import { format, formatDistance } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { styled } from "../Stitches";
import { Button } from "./Button";
import Emoji from "./Emoji";
import { Fade } from "./Fade";
import Nav from "./Nav";
import NextPrevious from "./NextPrevious";
import { Bibliography } from "./References";
import { VSpacer } from "./Spacers";
import { StarBackground } from "./StarBackground";
import { Subscribe } from "./Subscribe";

const containerStyles = css``;

const BlogContainer = styled("div", {
  padding: "1.3rem",
  margin: "auto",
  maxWidth: "720px",
});

const Blog = styled("div", {
  "h1, h2, h3, h4, h5": {
    margin: 0,
    padding: 0,
    fontFamily: "$headingSerif",
    color: "#ff8f8f",
    fontWeight: "bold",
  },
  h1: {
    fontSize: "3.4rem",
  },
  h2: {
    fontSize: "$6",
    paddingTop: "$5",
  },
  h3: {
    fontSize: "$5",
    paddingTop: "$5",
  },
  "p, li": {
    color: "rgb(241, 200, 146)",
    fontSize: "1.2em",
    lineHeight: "170%",
  },
  "li + li": {
    marginTop: "12px",
  },
  a: {
    textDecoration: "underline",
  },
  "a:hover, a:hover > *": {
    cursor: "pointer",
    color: "#7d8aff",
  },
  blockquote: {
    borderLeft: "solid 4px #ff8f8f",
    paddingLeft: "1.1rem",
    marginLeft: "-20px",
    marginRight: "-20px",
    fontStyle: "italic",
  },
  /* Bibliography */
  "a:target > *": {
    borderBottom: "solid 2px #ff8f8f",
  },
  "div:target > p": {
    borderBottom: "solid 1px #ff8f8f",
    paddingBottom: "8px",
  },
  sup: {
    lineHeight: "0",
  },
  hr: {
    margin: "2.2rem 0",
    borderColor: "$salmon",
  },
});

const divider = css`
  border-width: 1px;
  border-color: #ff969644;
  border-style: solid;
`;

type Meta = { title: string; date: Date; id: string; wordCount?: number };

type LayoutProps = {
  meta: Meta;
  children: React.ReactNode;
};

const timeToRead = (words: number) => {
  const readingSpeed = 200; // Words / minute
  const minutesToRead = words / readingSpeed;
  return formatDistance(0, minutesToRead * 1000 * 60, { includeSeconds: true });
};

const FrontMatterHeading = styled("h1", {
  margin: 0,
  padding: 0,

  fontSize: "$7",
  fontFamily: "$headingSerif",
});

const FrontMatterMeta = styled("p", {
  margin: 0,
  padding: 0,

  fontFamily: "$mono",
  fontSize: "$3",
  color: "$yellow",
});

const FrontMatter = ({ title, date, wordCount }: Meta) => (
  <div>
    <FrontMatterHeading>{title}</FrontMatterHeading>
    <VSpacer size="sm" />
    <FrontMatterMeta>
      <Emoji symbol="⏇" label="Unicode Thingy" /> Zan. <Emoji symbol="⊱" label="Unicode Thingy" />
      {format(date, "MMMM, y")}
      <Emoji symbol="⊰" label="Unicode swoosh symbol" />
    </FrontMatterMeta>
    {wordCount && (
      <FrontMatterMeta>
        {/* <Emoji symbol="⎇" label="Unicode upside down option symbol" /> {wordCount} words.{" "} */}
        <Emoji symbol="⪽" label="Unicode symbol for a subset with a dot" /> {timeToRead(wordCount)}
      </FrontMatterMeta>
    )}
  </div>
);

const AllPostsButton = () => {
  return (
    <Link href="/posts">
      <a>
        <Button>{"<-"} All Posts</Button>
      </a>
    </Link>
  );
};

export default function Layout({ meta, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{meta.title} - Boundless Garden 🌸</title>
      </Head>
      <Fade>
        <StarBackground height="full" />
        <div className={cx(containerStyles)}>
          <Nav />

          <BlogContainer>
            <AllPostsButton />
            <VSpacer size="xl" />
            <FrontMatter {...meta} />

            <Blog>
              <VSpacer size="sm" />
              <div className={cx(divider)}></div>
              <VSpacer size="sm" />
              <div>{children}</div>
              <Bibliography />
              <Subscribe />
              <VSpacer size="md" />
              <NextPrevious currentPostId={meta.id} />
            </Blog>
          </BlogContainer>
        </div>
      </Fade>
    </>
  );
}

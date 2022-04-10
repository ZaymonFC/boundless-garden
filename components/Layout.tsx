import { css, cx } from "@emotion/css";
import { format, formatDistance } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { colours } from "../styles/tokens";
import AtomFlower from "./AtomFlower";
import { StarBackground } from "./Background";
import Emoji from "./Emoji";
import { Fade } from "./Fade";
import { Bibliography } from "./References";
import { Subscribe } from "./Subscribe";

const containerStyles = css`
  justify-content: center;
`;

const navStyles = css`
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.5rem;
  }
`;

const HomeLink = ({ children }: any) => (
  <Link href="/">
    <a>{children}</a>
  </Link>
);

const Nav = () => {
  return (
    <div>
      <div className={cx(navStyles)}>
        <HomeLink>
          <AtomFlower small />
        </HomeLink>
        <HomeLink>
          <h1>Boundless Garden</h1>
        </HomeLink>
      </div>
    </div>
  );
};

const blogStyles = css`
  & {
    padding: 1.3rem;
  }
  h1 {
    font-family: Cardo;
    font-weight: 700;
    color: #ff8f8f;
    font-size: 3.4rem;
  }
  h2 {
    font-size: 1.94rem;
    color: #ff8f8f;
    padding-top: 1.94rem;
  }
  h3 {
    font-size: 1.4rem;
    padding-top: 1.4rem;
    color: #ff8f8f;
  }
  & {
    flex-direction: column;
    margin: auto;
    max-width: 720px;
  }

  p,
  li {
    color: rgb(241, 200, 146);
    font-size: 1.2rem;
    line-height: 170%;
  }

  li + li {
    margin-top: 12px;
  }

  a:hover,
  a:hover > * {
    cursor: pointer;
    color: #7d8aff;
  }

  blockquote {
    border-left: solid 4px #ff8f8f;
    padding-left: 1.1rem;
    margin-left: -20px;
    margin-right: -20px;
    font-style: italic;
  }

  /* Bibliography */
  a:target > * {
    border-bottom: solid 2px #ff8f8f;
  }

  div:target > p {
    border-bottom: solid 1px #ff8f8f;
    padding-bottom: 8px;
  }
  sup {
    line-height: 0;
  }
  hr {
    margin: 2.2rem 0;
    border-color: ${colours.secondary};
  }
`;

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

const FrontMatterStyles = css`
  font-size: 1rem;
  color: ${colours.secondary};
  font-family: "Jetbrains Mono";
  p {
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
  }
`;

const FrontMatter = ({ title, date, wordCount }: Meta) => (
  <div className={cx(FrontMatterStyles)}>
    <h1>{title}</h1>
    <p>
      <Emoji symbol="⏇" label="Unicode Thingy" /> Zan. <Emoji symbol="⊱" label="Unicode Thingy" />
      {format(date, "MMMM, y")}
      <Emoji symbol="⊰" label="Unicode Thingy" />
    </p>
    {wordCount && (
      <p>
        <Emoji symbol="⎇" label="Unicode Thingy" /> {wordCount} words.{" "}
        <Emoji symbol="⪽" label="Unicode symbol for a subset with a dot" /> {timeToRead(wordCount)}
      </p>
    )}
  </div>
);

export default function Layout({ meta, children }: LayoutProps) {
  const height = "40rem";
  return (
    <>
      <Head>
        <title>{meta.title} - Boundless Garden 🌸</title>
      </Head>
      <Fade>
        <div style={{ position: "relative", height: height }}>
          <StarBackground />
          <div className={cx(containerStyles)}>
            <Nav></Nav>

            <div className={cx(blogStyles)}>
              <FrontMatter {...meta} />
              <div className={cx(divider)}></div>
              <div>{children}</div>
              <Bibliography />
              <Subscribe />
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

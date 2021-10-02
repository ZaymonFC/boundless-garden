import { css, cx } from "@emotion/css";
import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import AtomFlower from "./AtomFlower";
import { Fade } from "./Fade";
import { Bibliography } from "./References";

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

// Font Scale
// Text 1.2 rem
// h3 1.94
// h2 3.1

const blogStyles = css`
  & {
    padding: 1.3rem;
  }
  h1 {
    color: #ff8181;
    font-size: 3rem;
  }
  h2 {
    font-size: 1.94rem;
    color: #ff8f8f;
    padding-top: 1.94rem;
  }
  h3 {
    font-size: 1.2rem;
    padding-top: 1.2rem;
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

  a:hover,
  a:hover > * {
    cursor: pointer;
    color: #7d8aff;
  }

  blockquote {
    border-left: solid 4px #ff8f8f;
    padding-left: 1rem;
    margin-left: 0;
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
`;

const divider = css`
  border-width: 1px;
  border-color: #ff969644;
  border-style: solid;
`;

type Meta = { title: string; date: Date; id: string };

type LayoutProps = {
  meta: Meta;
  children: React.ReactNode;
};

export default function Layout({ meta, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{meta.title} - Boundless Garden 🌸</title>
      </Head>
      <Fade>
        <div className={cx(containerStyles)}>
          <Nav></Nav>

          <div className={cx(blogStyles)}>
            <h1>{meta.title}</h1>
            <p>Zan, {format(meta.date, "MMMM, y")}</p>
            <div className={cx(divider)}></div>
            <div>{children}</div>
            <Bibliography />
          </div>
        </div>
      </Fade>
    </>
  );
}

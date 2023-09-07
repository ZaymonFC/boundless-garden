import Head from "next/head";
import Link from "next/link";
import React from "react";
import AtomFlower from "../components/AtomFlower";
import { Button } from "../components/Button";
import { Fade } from "../components/Fade";
import Stack from "../components/Stack";
import { HomeBackground } from "../components/StarBackground";
import { useLatestPosts } from "../hooks/tags";
import { colors, styled } from "../Stitches";
import styles from "../styles/Home.module.css";
import { metaToPostTile, PostGridContainer } from "./posts";

const LatestPostBadge = styled("span", {
  display: "inline-block",
  marginBottom: "$4",
  paddingBlock: 1,
  paddingInline: 2,

  color: "$yellow",

  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$yellow",
  borderRadius: 3,

  fontFamily: "Jetbrains Mono",
  fontSize: "0.9em",
  fontWeight: 400,
});

const Main = styled("main", {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,

  padding: "5rem 2rem",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  variants: {
    size: {
      full: { height: "100vh" },
      mobile: { height: undefined, padding: "3rem 1.5rem" },
    },
  },
});

const HomeH1 = styled("h1", {
  variants: {
    size: {
      sm: { fontSize: "2.7rem" },
      lg: { fontSize: "4rem" },
    },
  },
});

const SubTitle = styled("p", {
  variants: {
    size: {
      sm: { fontSize: "1.4rem" },
      lg: { fontSize: "2rem" },
    },
  },
});

const Header = () => {
  const latestPosts = useLatestPosts(1);

  return (
    <div style={{ position: "relative" }}>
      <HomeBackground />
      <Main size={{ "@initial": "mobile", "@bp1": "full" }}>
        <AtomFlower />
        <HomeH1 size={{ "@initial": "sm", "@bp1": "lg" }} className={styles.title}>
          the Boundless Garden
        </HomeH1>
        <SubTitle size={{ "@initial": "sm", "@bp1": "lg" }}>leaves on a fractal rose</SubTitle>

        <div>
          <LatestPostBadge>Latest Post</LatestPostBadge>
          <PostGridContainer columns={"single"}>
            {latestPosts.map((post) => metaToPostTile(...post))}
          </PostGridContainer>
          <Stack justify="end">
            <Link href="/intro">
              <a>
                <Button size="sm">New here?</Button>
              </a>
            </Link>
            <Link href="/posts">
              <a>
                <Button size="sm">All Posts</Button>
              </a>
            </Link>
          </Stack>
        </div>
      </Main>
    </div>
  );
};

const Favicons = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content={colors.background} />
    <meta name="theme-color" content={colors.background}></meta>
  </>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Boundless Garden</title>
        <meta name="description" content="Step into the boundless garden" />
        <Favicons />
      </Head>
      <Fade>
        <Header></Header>
      </Fade>
    </>
  );
}

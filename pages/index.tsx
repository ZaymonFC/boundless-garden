import Head from "next/head";
import Link from "next/link";
import React from "react";
import AtomFlower from "../components/AtomFlower";
import { Fade } from "../components/Fade";
import { ThreeWithStars } from "../components/ThreeWithStars";
import { colors } from "../Stitches";
import styles from "../styles/Home.module.css";
import { colours } from "../styles/tokens";

const Header = () => {
  const height = "100vh";
  return (
    <div style={{ position: "relative", height: height }}>
      <ThreeWithStars />
      <main
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: height,
        }}
        className={styles.main}
      >
        <AtomFlower />
        <h1 className={styles.title}>the Boundless Garden</h1>
        <p className={styles.byLine}>the writings of Zan</p>

        <Link href="/intro">begin here</Link>
      </main>
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

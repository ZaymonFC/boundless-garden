import { OrthographicCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import AtomFlower from "../components/AtomFlower";
import { Fade } from "../components/Fade";
import { ThreeWithStars } from "../components/ThreeWithStars";
import styles from "../styles/Home.module.css";

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Boundless Garden</title>
        <meta name="description" content="Step into the boundless garden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fade>
        <Header></Header>
      </Fade>
    </>
  );
}

import { OrthographicCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import React from "react";
import AtomFlower from "../components/AtomFlower";
import styles from "../styles/Home.module.css";

const ThreeD = () => {
  return (
    <Canvas>
      <OrthographicCamera makeDefault zoom={40} position={[0, 0, 10]} />
      <ambientLight />
      <Stars radius={50} depth={10} count={10000} factor={2} fade></Stars>
      <pointLight position={[10, 15, 10]} />
    </Canvas>
  );
};

const Header = () => {
  const height = "100vh";
  return (
    <div style={{ position: "relative", height: height }}>
      <ThreeD />
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
      <Header></Header>
    </>
  );
}

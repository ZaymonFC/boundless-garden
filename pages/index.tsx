import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Head from "next/head";
import React, { useMemo, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { NoToneMapping, Vector2, Vector3 } from "three";
import { OrthographicCamera, Sky, Stars, Torus } from "@react-three/drei";
import { MathUtils } from "three";

function Icon(props: any) {
  return (
    <svg
      width={114}
      height={178}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx={57.392}
        cy={57.5}
        rx={22.392}
        ry={54.5}
        stroke="url(#prefix__paint0_radial)"
        strokeWidth={3}
      />
      <path
        d="M26.5 177.5c0-34.5 6.8-53.9 12-67.5C42.132 100.5 53 80 57 58"
        stroke="#000"
        strokeWidth={5}
      />
      <ellipse
        cx={57.5}
        cy={57.608}
        rx={22.392}
        ry={54.5}
        transform="rotate(-90 57.5 57.608)"
        stroke="url(#prefix__paint1_radial)"
        strokeWidth={3}
      />
      <ellipse
        cx={57.37}
        cy={57.704}
        rx={22.392}
        ry={54.5}
        transform="rotate(-45 57.37 57.704)"
        stroke="url(#prefix__paint2_radial)"
        strokeWidth={3}
      />
      <ellipse
        cx={57.296}
        cy={57.37}
        rx={22.392}
        ry={54.5}
        transform="rotate(45 57.296 57.37)"
        stroke="url(#prefix__paint3_radial)"
        strokeWidth={3}
      />
      <circle cx={57} cy={58} r={6} fill="#E16565" />
      <defs>
        <radialGradient
          id="prefix__paint0_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 147.5 -60.6008 0 57.357 -21)"
        >
          <stop stopColor="#FFF500" />
          <stop offset={1} stopColor="#4F00F7" />
        </radialGradient>
        <radialGradient
          id="prefix__paint1_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 186.5 -76.624 0 58 -47.426)"
        >
          <stop stopColor="#00D1FF" />
          <stop offset={1} stopColor="red" />
        </radialGradient>
        <radialGradient
          id="prefix__paint2_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(89.222 41.738 14.761) scale(156.285 64.2101)"
        >
          <stop stopColor="#00FF85" />
          <stop offset={1} stopColor="#8F00FF" />
        </radialGradient>
        <radialGradient
          id="prefix__paint3_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3.88924 211.7783 -87.00973 1.5979 55.857 -44.428)"
        >
          <stop stopColor="#FF3D00" />
          <stop offset={1} stopColor="#0057FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Sphere(props: any) {
  const mesh = useRef<any>();
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      {...props}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
      scale={0.1}
      ref={mesh}
    >
      <sphereGeometry />
      <meshStandardMaterial color={hovered ? "orange" : "red"} />
    </mesh>
  );
}

const MyTorus = ({ color }: any) => (
  <Torus args={[2, 0.04, 10, 24]} scale={[0.25, 0.5, 0.5]}>
    <meshStandardMaterial {...{ color }} />
  </Torus>
);

const MyRing = () => {
  const box = useRef<any>();

  useFrame((state, delta) => {
    box.current.lookAt(
      new Vector3(
        state.mouse.x,
        state.mouse.y,
        state.camera.position.z
      ).multiplyScalar(3)
    );
  });

  return (
    <group ref={box}>
      <group rotation={[0, 0, 0]}></group>
      <MyTorus color="white" />
      <group rotation={[0, 0, Math.PI / 4]}>
        <MyTorus color="white" />
      </group>
      <group rotation={[0, 0, Math.PI / 2]}>
        <MyTorus color="white" />
      </group>
      <group rotation={[0, 0, (3 * Math.PI) / 4]}>
        <MyTorus color="white" />
      </group>
      {/* <Ring /> */}
    </group>
  );
};

const Atom = (props: any) => {
  return (
    <group scale={0.7} {...props}>
      <MyRing />
      <Sphere />
    </group>
  );
};

const disperse = (v: Vector3) => {
  const magnitude = 1 / (v.length() * 0.12);

  const unit = new Vector2(v.x, v.y).normalize();

  return v.add(new Vector3(unit.x, unit.y / 2, 0).multiplyScalar(magnitude));
};

const makeGrid = (width: number, height: number, spacing: number) => {
  const offSetX = -width * (0.5 * spacing);
  const offSetY = -height * (0.5 * spacing);
  const offset = new Vector3(offSetX, offSetY, 0);
  const innerCircle = 10;

  let arr = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let position = new Vector3(i * spacing, j * spacing, 0);
      position.add(offset);

      if (position.length() > innerCircle) {
        arr.push(disperse(position));
      }
    }
  }
  return arr;
};

const makePoints = (radius: number, t: number) => {
  return [...Array(8)]
    .map((n, i) => i)
    .map((i) => MathUtils.lerp(0, 2 * Math.PI, i / 8))
    .map((i) => [
      Math.cos(i + t) * radius,
      Math.sin(i + t) * (radius / 1.5),
      0,
    ]);
};

const Atoms = () => {
  const width = 15;
  const height = 15;
  const spacing = 5;

  const [points, updatePoints] = useState(makeGrid(width, height, spacing));

  return (
    <group position={[0, 0, 0]}>
      {/* {points.map((position, idx) => (
        <Atom key={idx} position={position} />
      ))} */}
      <Stars radius={50} depth={10} count={10000} factor={2} fade></Stars>
    </group>
  );
};

const ThreeD = () => {
  return (
    <Canvas>
      <OrthographicCamera makeDefault zoom={40} position={[0, 0, 10]} />
      <ambientLight />
      <Atoms />
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
        <Icon />
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

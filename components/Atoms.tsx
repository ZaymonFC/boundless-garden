import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { MathUtils, Vector2, Vector3 } from "three";

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
      new Vector3(state.mouse.x, state.mouse.y, state.camera.position.z).multiplyScalar(3),
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
    .map((i) => [Math.cos(i + t) * radius, Math.sin(i + t) * (radius / 1.5), 0]);
};

const Atoms = () => {
  const width = 15;
  const height = 15;
  const spacing = 5;

  const [points, updatePoints] = useState(makeGrid(width, height, spacing));

  return (
    <group position={[0, 0, 0]}>
      {points.map((position, idx) => (
        <Atom key={idx} position={position} />
      ))}
    </group>
  );
};

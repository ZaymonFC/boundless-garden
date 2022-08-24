import { OrthographicCamera, PerspectiveCamera, Sparkles, Stars } from "@react-three/drei";
import { Canvas, Color, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import React, { useRef } from "react";

export const ThreeWithStars = () => (
  <Canvas>
    <OrthographicCamera makeDefault zoom={30} position={[0, 0, 10]} />
    <ambientLight />
    <Stars radius={30} depth={10} count={50000} factor={1} fade></Stars>
    <pointLight position={[10, 15, 10]} />
  </Canvas>
);

function Sphere({
  position,
  color,
}: {
  position: [x: number, y: number, z: number];
  color?: Color;
}) {
  const ref = useRef<any>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const orbitX = 1; /* x-coordinate in orbit's center */
      const orbitY = 1; /* y-coordinate in orbit's center */
      const orbitRadius = 20;
      const orbitSpeed = Math.PI / 16;
      // const sphereRadius = 10;

      // 	/*
      // 	 * based on the current time interval, we'll calculate where the sphere
      // 	 * is at on its orbit
      // 	 */
      const radian = orbitSpeed * t * 10;
      const x = orbitX + orbitRadius * Math.cos(radian);
      const y = orbitY + orbitRadius * Math.sin(radian);

      ref.current.position.x = x + position[0];
      ref.current.position.y = y + position[1];
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereBufferGeometry args={[2, 0.5, 0.5, 0.5]} attach="geometry" />
      <meshPhongMaterial color={color} attach="material" />
    </mesh>
  );
}

const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

export const HomeScene = () => {
  const amount = 140;
  const size = 1.2;

  const sizes = new Float32Array(Array.from({ length: amount }, () => getRandomFloat(0.4, size)));

  return (
    <Canvas>
      <EffectComposer>
        <Noise opacity={0.2} />
        <Vignette eskil={true} offset={-0.4} darkness={1.25} />
        <Bloom luminanceThreshold={7} luminanceSmoothing={1} height={400} />
      </EffectComposer>
      <PerspectiveCamera makeDefault zoom={4} position={[0, 0, 5]} />
      <ambientLight />
      <Stars radius={0.9} depth={0.2} count={50000} factor={0.09} fade speed={0.5} />
      <group position={[0.01, 1.15, 0]}>
        <Sparkles
          scale={2}
          size={sizes}
          opacity={0.8}
          count={amount}
          speed={0.07}
          noise={0.8}
          color={"orange"}
        />
      </group>
      <pointLight position={[10, 15, 10]} />
      <Sphere position={[0, 30, 0]} color={[255, 255, 0]} />
    </Canvas>
  );
};

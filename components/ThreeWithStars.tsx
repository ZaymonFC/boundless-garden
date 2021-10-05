import { Stars, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

export const ThreeWithStars = () => (
  <Canvas>
    <OrthographicCamera makeDefault zoom={30} position={[0, 0, 10]} />
    <ambientLight />
    <Stars radius={50} depth={10} count={50000} factor={1} fade></Stars>
    <pointLight position={[10, 15, 10]} />
  </Canvas>
);

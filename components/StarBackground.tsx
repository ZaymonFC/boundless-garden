import { useParallax } from "../hooks/useParallax";
import { styled } from "../Stitches";
import { HomeScene, ThreeWithStars } from "./3D";

const Underneath = styled("div", {
  position: "fixed",
  pointerEvents: "none",

  height: "30vh", // Account for parallax
  width: "100vw",

  variants: {
    height: {
      full: { height: "100vh" },
      header: { height: "30vh" },
    },
  },
});

export const StarBackground = ({ height }: { height: "full" | "header" }) => {
  const parallax = useParallax<HTMLDivElement>(0.2);

  return (
    <Underneath height={height} ref={parallax}>
      <ThreeWithStars />
    </Underneath>
  );
};

export const HomeBackground = () => (
  <Underneath height="full">
    <HomeScene />
  </Underneath>
);

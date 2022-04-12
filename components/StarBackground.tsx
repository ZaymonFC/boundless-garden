import { useParallax } from "react-scroll-parallax";
import { styled } from "../Stitches";
import { ThreeWithStars } from "./ThreeWithStars";

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
  const parallax = useParallax<HTMLDivElement>({
    speed: 25,
    rootMargin: { top: 0, left: 0, right: 0, bottom: 30000 },
  });

  return (
    <Underneath height={height} ref={parallax.ref}>
      <ThreeWithStars />
    </Underneath>
  );
};

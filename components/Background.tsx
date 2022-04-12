import { useParallax } from "react-scroll-parallax";
import { styled } from "../Stitches";
import { ThreeWithStars } from "./ThreeWithStars";

const Underneath = styled("div", {
  position: "fixed",
  pointerEvents: "none",

  height: "30vh", // Account for parallax
  width: "100vw",
});

export const StarBackground = () => {
  const parallax: any = useParallax({ speed: 3 });

  return (
    <Underneath ref={parallax.ref}>
      <ThreeWithStars />
    </Underneath>
  );
};

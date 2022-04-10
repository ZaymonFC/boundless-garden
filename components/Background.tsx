import { useParallax } from "react-scroll-parallax";
import { styled } from "../Stitches";
import { ThreeWithStars } from "./ThreeWithStars";

const Underneath = styled("div", {
  position: "fixed",
  left: 0,
  pointerEvents: "none",

  height: "75vh", // Account for parallax
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

import { useState, useRef } from "react";
import { playSfx, sfxAtlas } from "../lib/Sounds";
import { styled } from "../Stitches";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const initialCount = 885;
const maxClaps = 10;
const clapSize = 42;
const clapIcon = "💖";

const Relative = styled("div", {
  position: "relative",
});

const ClapButton = styled(motion.button, {
  position: "absolute",
  top: 0,
  left: 0,

  border: "none",
  background: "none",
  cursor: "pointer",

  fontSize: clapSize,
  lineHeight: 1,

  width: clapSize,
  height: clapSize,

  padding: 0,
  margin: 0,

  zIndex: 0,
});

const BlendOverlay = styled(ClapButton, {
  zIndex: 1,

  filter: "grayscale(100%)",
});

export const Clap = () => {
  const [count, setCount] = useState(0);
  const fillPercent = useMotionValue(100);
  const clapButtonRef = useRef<HTMLButtonElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (count >= maxClaps) {
      playSfx(sfxAtlas.blip);
      return;
    }

    setCount(count + 1);
    playSfx(sfxAtlas.powerup, { pitch: count * 10 });

    const newFillPercent = 90 - Math.round((count / maxClaps) * 100);
    fillPercent.set(newFillPercent);

    if (!clapButtonRef.current) return;
  };

  const scaleElements = (scale: number) => () => {
    if (!clapButtonRef.current || !overlayButtonRef.current) return;
    clapButtonRef.current.style.transform = `scale(${scale})`;
    overlayButtonRef.current.style.transform = `scale(${scale})`;
  };

  const cssSpring = useSpring(fillPercent, { stiffness: 1000, damping: 40 });
  const css = useTransform(
    cssSpring,
    (v) => `linear-gradient(to bottom, black ${v}%, transparent ${v}%)`
  );

  return (
    <div>
      <span>{count + initialCount}</span>
      <Relative>
        <ClapButton ref={clapButtonRef} onMouseEnter={scaleElements(1.1)}>
          {clapIcon}
        </ClapButton>
        <BlendOverlay
          ref={overlayButtonRef}
          onClick={handleClick}
          onMouseEnter={scaleElements(1.1)}
          onMouseLeave={scaleElements(1)}
          onMouseDown={scaleElements(0.9)}
          onMouseUp={scaleElements(1)}
          style={{ WebkitMaskImage: css, maskImage: css }}
        >
          {clapIcon}
        </BlendOverlay>
      </Relative>
      <br />
    </div>
  );
};

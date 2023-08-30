import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useClaps } from "../hooks/useClap";
import { randomRange, clamp } from "../lib/math";
import { playSfx, sfxAtlas } from "../lib/Sounds";
import { styled } from "../Stitches";
import { DamageNumber, useDamageNumbers } from "./DamageNumber";

// --- Constants --------------------------------------------------------------
const maxClaps = 10;
const clapSize = 38;

const clapPairs = [
  ["💖", "hearts"],
  ["👏", "claps"],
  ["💎", "gems"],
  ["🥂", "toasts"],
  ["🌸", "flowers"],
  ["🎩", "hat tips"],
];

// --- Styled -----------------------------------------------------------------
const Relative = styled("div", {
  position: "relative",
  width: clapSize,
  height: clapSize,
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

const ClapContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  border: "solid 1px $yellow",
  borderRadius: "$5",

  transition: "all 0.1s ease-in-out",

  boxShadow: "0 0 0 0.5px $salmon inset",
  backdropFilter: "blur(1px)",

  "&:hover": {
    boxShadow: "0 0 0 100000px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(0px)",
  },

  variants: {
    mobile: {
      true: { padding: "$6 $4", gap: "$6" },
      false: { padding: "$6 $8", gap: "$8" },
    },
  },
  defaultVariants: { mobile: "true" },
});

const LikeText = styled("span", {
  fontFamily: "Jetbrains Mono",
  fontSize: "$2",
  color: "$offWhite",
});

/// --- Hooks -----------------------------------------------------------------
const calculateFillPercent = (claps: number) => {
  const clamper = clamp(0, 100);
  const fillPercent = 90 - (claps / maxClaps) * 100;

  return clamper(fillPercent);
};

const useImageMaskSpring = (claps: number | undefined) => {
  const fillPercent = useMotionValue(Number(100));

  useEffect(() => {
    if (claps === undefined) return;

    fillPercent.set(calculateFillPercent(claps));
  }, [claps, fillPercent]);

  const fillPercentSpring = useSpring(fillPercent, { stiffness: 1000, damping: 30 });
  const roundedFillPercentSpring = useTransform(fillPercentSpring, (v) => Math.round(v));
  const dynamicGradient = useTransform(roundedFillPercentSpring, (v) => {
    return `linear-gradient(to bottom, black ${v}%, transparent ${v}%)`;
  });

  return dynamicGradient;
};

/// --- Putting it all together -----------------------------------------------
export const Clap = ({ postId }: { postId: string }) => {
  const [clapIcon, clapText] = clapPairs[Math.floor(Math.random() * clapPairs.length)];

  const clapButtonRef = useRef<HTMLButtonElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);

  const { claps, clap } = useClaps(postId);
  const css = useImageMaskSpring(claps);
  const { damageNumbers, addDamageNumber } = useDamageNumbers(200);

  const handleClick = useCallback(() => {
    if (claps >= maxClaps) {
      playSfx(sfxAtlas.blip);
      return;
    }

    clap();
    playSfx(sfxAtlas.powerup, { pitch: claps * 10 });

    addDamageNumber(1, { top: "-5px", left: clapSize / 2 - 6 + randomRange(-20, 10) + "px" });
  }, [claps, addDamageNumber]);

  const scaleElements = (scale: number) => () => {
    if (!clapButtonRef.current || !overlayButtonRef.current) return;
    clapButtonRef.current.style.transform = `scale(${scale})`;
    overlayButtonRef.current.style.transform = `scale(${scale})`;
  };

  return (
    <ClapContainer>
      <Relative>
        <AnimatePresence>
          {damageNumbers.map((damage) => (
            <DamageNumber key={damage.id} value={damage.value} position={damage.position} />
          ))}
        </AnimatePresence>
        <ClapButton ref={clapButtonRef}>{clapIcon}</ClapButton>
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
      <LikeText>
        This post has {claps} {clapText}
      </LikeText>
    </ClapContainer>
  );
};

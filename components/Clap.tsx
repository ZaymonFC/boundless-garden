import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useClaps } from "../hooks/useClap";
import { playSfx, sfxAtlas } from "../lib/Sounds";
import { styled } from "../Stitches";
import { DamageNumber, useDamageNumbers } from "./DamageNumber";

const maxClaps = 10;
const clapSize = 38;
const clapIcon = "💖";

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

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

const ClapContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  border: "solid 1px $yellow",

  borderRadius: "$5",

  transition: "all 0.1s ease-in-out",
  backdropFilter: "blur(1px)",

  boxShadow: "0 0 0 0.5px $salmon inset",

  "&:hover": {
    boxShadow: "0 0 0 100000px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(0px)",
  },

  variants: {
    mobile: {
      true: {
        padding: "$6 $4",
        gap: "$6",
      },
      false: {
        padding: "$6 $8",
        gap: "$8",
      },
    },
  },
  defaultVariants: {
    mobile: "true",
  },
});

const PostTileTagContainer = styled("span", {
  display: "inline-block",
  paddingBlock: 1,
  paddingInline: 2,

  borderWidth: 1,
  borderRadius: 3,

  fontFamily: "Jetbrains Mono",
  fontSize: "$1.5",
});

const calculateFillPercent = (claps: number) => {
  return 90 - Math.round((claps / maxClaps) * 100);
};

export const Clap = ({ postId }: { postId: string }) => {
  const { globalClaps, claps, clap } = useClaps(postId);

  const fillPercent = useMotionValue(Number(100));
  const clapButtonRef = useRef<HTMLButtonElement>(null);
  const overlayButtonRef = useRef<HTMLButtonElement>(null);

  const { damageNumbers, addDamageNumber } = useDamageNumbers(200);

  useEffect(() => {
    if (claps === undefined) return;

    fillPercent.set(calculateFillPercent(claps));
  }, [claps, fillPercent]);

  const handleClick = useCallback(() => {
    if (claps >= maxClaps) {
      playSfx(sfxAtlas.blip);
      return;
    }

    clap();
    playSfx(sfxAtlas.powerup, { pitch: claps * 10 });

    addDamageNumber(1, {
      top: "-5px",
      left: clapSize / 2 - 6 + randomRange(-20, 10) + "px",
    });
  }, [claps, addDamageNumber]);

  const scaleElements = (scale: number) => () => {
    if (!clapButtonRef.current || !overlayButtonRef.current) return;
    clapButtonRef.current.style.transform = `scale(${scale})`;
    overlayButtonRef.current.style.transform = `scale(${scale})`;
  };

  const cssSpring = useSpring(fillPercent, { stiffness: 1000, damping: 30 });
  const css = useTransform(cssSpring, (v) => {
    return `linear-gradient(to bottom, black ${v}%, transparent ${v}%)`;
  });

  return (
    <ClapContainer>
      <Relative>
        <AnimatePresence>
          {damageNumbers.map((damage) => (
            <DamageNumber key={damage.id} value={damage.value} position={damage.position} />
          ))}
        </AnimatePresence>
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
      <PostTileTagContainer>This post has {claps + globalClaps} likes</PostTileTagContainer>
    </ClapContainer>
  );
};

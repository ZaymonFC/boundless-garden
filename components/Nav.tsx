import {
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { delay, merge, Subject } from "rxjs";
import useObservable from "../hooks/useObservable";
import { styled } from "../Stitches";
import AtomFlower from "./AtomFlower";
import Stack from "./Stack";

const NavContainer = styled(motion.div, {
  margin: 0,
  padding: "$5",
  position: "relative",
});

const NavHeading = styled("h1", {
  fontSize: "$5",
});

const HomeLink = ({ children }: any) => (
  <Link href="/">
    <a>{children}</a>
  </Link>
);

const useEngageAfterScroll = (y: number) => {
  const { scrollY } = useScroll();

  const engaged$ = useMemo(() => new Subject<boolean>(), []);
  const home$ = useMemo(() => new Subject<boolean>(), []);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((v) => v > y && engaged$.next(true));
    return unsubscribe;
  }, [scrollY, engaged$]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((v) => v < 10 && home$.next(false));
    return unsubscribe;
  }, [scrollY, home$]);

  const combined = merge(engaged$.pipe(delay(150)), home$.pipe(delay(250)));
  return useObservable(combined, false);
};

const useBop = (scrollY: MotionValue<number>, disabled = false) => {
  const still = useMotionValue(0);
  const scrollScaled = useTransform(scrollY, (v) => v * 0.5);
  const xSmooth = useSpring(scrollScaled, { damping: 50, stiffness: 600 });

  return disabled ? xSmooth : still;
};

const Nav = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, (s) => (s > 20 ? 0 : 1));

  const engaged = useEngageAfterScroll(90);

  const opacitySpring = useSpring(opacity, { damping: 20, stiffness: 140 });

  const top = useBop(scrollY, !engaged);

  return (
    <NavContainer style={{ top, opacity: opacitySpring }}>
      <Stack justify={"spaceBetween"} align="center">
        <HomeLink>
          <AtomFlower small />
        </HomeLink>
        <HomeLink>
          <NavHeading>Boundless Garden</NavHeading>
        </HomeLink>
      </Stack>
    </NavContainer>
  );
};

export default Nav;

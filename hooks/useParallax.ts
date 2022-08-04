import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export const useParallax = <E extends HTMLElement>(speed: number, offset = 0) => {
  const parallax = useRef<E>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((v) => {
      if (!parallax.current) return;

      parallax.current.style.top = `${(v * -speed) / 10 + offset}px`;
    });

    return unsubscribe;
  }, [scrollY, parallax]);

  return parallax;
};

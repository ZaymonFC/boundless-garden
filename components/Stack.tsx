import { styled } from "../Stitches";

const childWithGap = "> * + *";

// Originally yoinked from https://codesandbox.io/s/stitches-stack-demo-lr2nj
const Stack = styled("div", {
  display: "flex",
  $$gap: "initial",

  variants: {
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      spaceBetween: { justifyContent: "space-between" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
    spacing: {
      none: { $$gap: 0 },
      sm: {
        $$gap: "$space$2",
      },
      md: {
        $$gap: "$space$5",
      },
      lg: {
        $$gap: "$space$6",
      },
    },
    direction: {
      column: {
        flexDirection: "column",
        [childWithGap]: { margin: "$$gap 0 0 0" },
      },
      row: {
        flexDirection: "row",
        [childWithGap]: { margin: "0 0 0 $$gap" },
      },
      "row-reverse": {
        flexDirection: "row-reverse",
        [childWithGap]: { margin: "0 $$gap 0 0" },
      },
      "column-reverse": {
        flexDirection: "column-reverse",
        [childWithGap]: { margin: "0 0 $$gap 0" },
      },
    },
  },
  defaultVariants: {
    direction: "row",
    spacing: "md",
    justify: "start",
  },
});

export default Stack;

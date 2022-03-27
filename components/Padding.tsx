import { styled } from "../Stitches";

const Padding = styled("div", {
  variants: {
    size: {
      xs: { padding: "$1" },
      sm: { padding: "$2" },
      md: { padding: "$4" },
      lg: { padding: "$6" },
      xl: { padding: "$8" },
    },
    constraint: {
      inline: { paddingBlock: 0 },
      block: { paddingInline: 0 },
    },
  },
  defaultVariants: { size: "md" },
});

export default Padding;

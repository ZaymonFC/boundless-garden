import { styled } from "../Stitches";

export const Button = styled("button", {
  margin: 0,
  borderRadius: "$2",
  padding: "$3",

  fontFamily: "JetBrains Mono",

  color: "#ff8f8f",
  backgroundColor: "rgba(0, 0, 0, 0.2)",

  border: "1px solid rgb(241, 200, 146)",
  boxShadow: "0px 4px 1px 0px rgb(241, 200, 146)",

  "&:hover": {
    boxShadow: "0px 3px 0px 0px rgb(241, 200, 146)",
    transform: "translate(0, 1px)",
  },
  "&:active": {
    boxShadow: "0px 1px 0px 0px rgb(241, 200, 146)",
    transform: "translate(0, 3px)",
  },

  variants: {
    fullWidth: { true: { width: "100%" } },
    size: {
      sm: { fontSize: "$2" },
      md: { fontSize: "$3" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

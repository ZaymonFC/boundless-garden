import { styled } from "../Stitches";

export const Button = styled("button", {
  margin: 0,
  padding: "$3",

  borderRadius: "$2",

  fontFamily: "JetBrains Mono",
  fontSize: "$3",

  color: "#ff8f8f",
  backgroundColor: "rgba(0, 0, 0, 0.2)",

  border: "1px solid rgb(241, 200, 146)",
  boxShadow: "0px 4px 1px 0px rgb(241, 200, 146)",

  "&:hover": {
    boxShadow: "0px 3px 0px 0px rgb(241, 200, 146)",
    transform: "translate(0, 1px)",

    color: "#ff8f8f",
  },
  "&:active": {
    boxShadow: "0px 1px 0px 0px rgb(241, 200, 146)",
    transform: "translate(0, 3px)",
  },

  variants: {
    fullWidth: { true: { width: "100%" } },
  },
});

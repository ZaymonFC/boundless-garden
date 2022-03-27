import { styled } from "../Stitches";
import Padding from "./Padding";
import Stack from "./Stack";

const Header = styled("h2", {});

const TextInput = styled("input", {
  width: "100%",
  marginBottom: 4,
  padding: 8,

  color: "rgb(241, 200, 146)",
  backgroundColor: "rgba(0, 0, 0, 0.2)",

  borderRadius: "$2",

  fontFamily: "JetBrains Mono",
  fontSize: "1.2em",

  border: "none",
  borderColor: "rgb(241, 200, 146)",
  borderWidth: 1,
  borderStyle: "solid",
});

const Button = styled("button", {
  width: "100%",
  padding: 4,

  borderRadius: "$2",

  fontFamily: "JetBrains Mono",
  fontSize: "1.2em",

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
});

const ButtonDownLink = styled("a", {
  fontSize: "0.8em",
  fontFamily: "Jetbrains Mono",
  color: "rgba(241, 200, 146, 0.7)",
});

const Form = () => (
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/zan"
    method="post"
    target="popupwindow"
    onSubmit={() => window.open("https://buttondown.email/zan", "popupwindow")}
  >
    <TextInput type="email" name="email" placeholder="your-email@example.com" id="bd-email" />
    <Button type="submit" value="Subscribe">
      Subscribe
    </Button>
    <div>
      <Padding size="md" constraint="block">
        <ButtonDownLink href="https://buttondown.email" target="_blank">
          Powered by Buttondown.
        </ButtonDownLink>
      </Padding>
    </div>
  </form>
);

export const Subscribe = () => {
  return (
    <>
      <Header>Subscribe to the Boundless.Garden</Header>
      <Form></Form>
    </>
  );
};

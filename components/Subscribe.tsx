import { styled } from "../Stitches";
import { Button } from "./Button";
import Padding from "./Padding";
import { VSpacer } from "./Spacers";

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
    <Button fullWidth type="submit" value="Subscribe">
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
      <VSpacer />
      <Form></Form>
    </>
  );
};

import { styled } from "@stitches/react";
import Head from "next/head";
import { Fade } from "../components/Fade";
import Nav from "../components/Nav";
import { ThreeWithStars } from "../components/ThreeWithStars";

const height = "100vh";

const Page = styled("div", {
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",

  color: "rgb(241, 200, 146)",

  p: {
    fontSize: "1.1em",
  },
});

const ThanksForSubscribing = () => (
  <>
    <Head>
      <title>Thank You - Boundless Garden 🌸</title>
    </Head>
    <Fade>
      <div style={{ position: "relative", height: height }}>
        <ThreeWithStars />
        <main
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: height,
          }}
        >
          <Nav></Nav>
          <Page>
            <h2>Thanks for subscribing to Boundless.Garden</h2>
            <p>
              You will receive an email soon from ButtonDown to confirm your subscription. You may
              now close this tab.
            </p>
          </Page>
        </main>
      </div>
    </Fade>
  </>
);

export default ThanksForSubscribing;
